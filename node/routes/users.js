const { validateUser, validateUpdateUser, validateUpdatePwd, validateForgotPwd, validateUserMsg } = require("../validations/user.validation");
const validateAuth = require('../validations/auth.validation');
const User = require("../model/users");
const { Card } = require("../model/cards");
const auth = require("../middleware/auth");

const config = require("config");
const jwt = require("JsonWebToken");
const nodemailer = require('nodemailer');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();


//Get all users:
router.get('/allUsers', auth, async (req, res) => {

  //Checking if the sender of the request is an admin
  if (req.user.admin === false) {
    res.status(401).send("Access denied, you are not an admin");
    return;
  }

  try {
    const allUsers = await User.find();
    if (allUsers.length < 0) {
      res.status(400).send('Sorry, there are no registered users yet');
      return;
    }

    res.send(allUsers);

  } catch (err) {
    console.log('err from get all users:', err);
    res.status(401).json({ err });
  }
})


//Add new user:
router.post('/signup', async (req, res) => {
  try {

    //Validation for the data from the user:
    const { error } = validateUser(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    //Check in the database if user already exists by email:
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send('User already exists');
      return;
    }


    //Deductive definition of admin - negative, unless it was pre-defined as positive
    let admin = false;
    if (req.body.admin) {
      admin = req.body.admin
    }

    user = new User({
      ...req.body,
      admin
    });


    //password encryption
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send('You have successfully registered');

  } catch (err) {
    res.status(401).json({ err });
  }
});


//Send token for user after login:
router.post('/login', async (req, res) => {
  try {
    //Validation for the data from the user:
    const { error } = validateAuth(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    //Check in the database if user exists by email:
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).send("Sorry, this email is not exist :(");
      return;
    }

    //Comparing the given password to the password in the database:
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      res.status(400).send("Sorry, invalid password:(");
      return;
    }


    //Create the token:
    const token = user.generateAuthToken();
    const admin = user.admin

    res.send({ token, admin });

  } catch (err) {
    console.log('err from auth:', err);
    res.status(401).json({ err });
  }
});


//Get user info by token:
router.get('/me', auth, async (req, res) => {

  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      res.status(400).send("Sorry, this user is not exist :(");
      return;
    }

    res.send(user);

  } catch (err) {
    console.log('err from "/me":', err);
    res.status(400).json({ err });
  }
});


//Update user:
router.patch('/update', async (req, res) => {
  const email = req.header('user-email');

  if (!email) {
    res.status(400).send("No email provided ");
    return;
  }

  try {
    const { error } = validateUpdateUser(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    let user = await User.findOneAndUpdate({ email }, req.body);

    if (!user) {
      res.status(404).send('The user with the given email was not found');
      return;
    }

    user = await User.findOne({ email });

    res.send(user)
  } catch (err) {
    console.log('err from update-card:', err);
    res.status(401).json({ err })
  }
});



//Delete user:
router.delete('/deleteUser', auth, async (req, res) => {

  //Checking if the sender of the request is an admin
  if (req.user.admin === false) {
    res.status(401).send("Access denied, you are not an admin");
    return;
  }

  const userId = req.header('user-id');

  if (!userId) {
    res.status(401).send("No card user id provide");
    return;
  }

  try {

    const user = await User.findByIdAndRemove({ _id: userId });

    if (!user) {
      res.status(404).send('The user with the given id was not found');
      return;
    }

    const allUsers = await User.find();
    res.send(allUsers);

  } catch (err) {
    console.log('err from delete-user:', err);
    res.status(401).json({ err })
  }
});


//forgot pwd:
router.post('/forgotPassword', async (req, res) => {
  try {
    const { error } = validateForgotPwd(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).send('User Not Exists');
      return;
    }

    const token = user.generateAuthToken();

    const link = `http://localhost:3003/users/resetPassword/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('email.adminMail'),
        pass: config.get('email.pwdMail'),
      },
      tls: {
        rejectUnauthorized: false,
      },

    });


    const mailOptions = {
      from: 'sellbuy442@gmail.com',
      to: email,
      subject: 'Password reset for SELL&BUY site',
      html: `
      <h1>Here is a link to reset your password:</h1>
      <div><a href=${link}>click here!</a></div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error.response)
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent: ' + info.response)
      }
    });
  } catch (err) {
    res.status(401).json({ message: "Something went wrong.", err });
  }
});


//Password update page
router.get('/resetPassword/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;
    let user = await User.findOne({ _id: id });

    if (!user) {
      res.status(400).send('User Not Exists');
      return;
    }

    //Verify the token from the params
    const verify = jwt.verify(token, config.get("jwtKey"));

    //Sending page to update the password
    res.render("index", { email: verify.email, status: 'Not Verified' });

  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Something went wrong.", err });
  }
});


//Update password
router.post('/resetPassword/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const { error } = validateUpdatePwd(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    let user = await User.findOne({ _id: id });
    if (!user) {
      res.status(400).send('User Not Exists');
      return;
    }

    //Verify the token from the params
    const verify = jwt.verify(token, config.get("jwtKey"));
    if (!verify) {
      res.status(400).send('Invalid Token');
      return;
    }

    //Encrypt the new password
    const hashPassword = await bcrypt.hash(password, 10)

    //Updating the user with the new password
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })

    //Sending the status to Verified to the update page
    res.render("index", { email: verify.email, status: 'Verified' });

  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Something went wrong.", err });
  }
});


//Contact from user:
router.post('/newMsg', async (req, res) => {
  try {
    //Validation for the data from the user:
    const { error } = validateUserMsg(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const { name, email, msg } = req.body;

    //Check in the database if user already exists by email:
    let user = await User.findOne({ email });

    let userId = user ? user._id : 'Unregistered user';


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('email.adminMail'),
        pass: config.get('email.pwdMail'),
      },
      tls: {
        rejectUnauthorized: false,
      },

    });


    const mailOptions = {
      from: 'sellbuy442@gmail.com',
      to: 'sellbuy442@gmail.com',
      subject: 'Contact msg from a user',
      html: `
        <h3>You received a message from ${name}, userId: ${userId}</h3>
        <p>${msg}</p>
        <p>Email to response : ${email}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error.response)
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send('Your message has been saved and we will get back to you soon');

  } catch (err) {
    console.log('err from add new user msg:', err);
    res.status(401).send(err);
  }
});


module.exports = router;
