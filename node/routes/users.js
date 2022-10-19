const { validateUser, validateUpdateUser, validateUpdatePwd, validateUpdateForgotPwd } = require("../validations/user.validation");
const validateAuth = require('../validations/auth.validation');
const User = require("../model/users");
const { Card } = require("../model/cards");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const config = require("config");
const jwt = require("JsonWebToken");
const nodemailer = require('nodemailer');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

//Get all users:
router.get('/allUsers', authAdmin, async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
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

    let admin = false;
    if (req.body.admin) {
      admin = req.body.admin
    }

    user = new User({
      ...req.body,
      admin
    });

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

    //Comparing the password given by the user to the password in the database:
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

    res.send({
      token,
    });

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
router.delete('/deleteUser', authAdmin, async (req, res) => {

  let user = await User.findById({ _id: req.user._id });

  if (!user) {
    res.status(400).send("Sorry, this user is not exist :(");
    return;
  }

  if (!user.admin) {
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


//Add card to favorites
router.patch('/addFavorite', auth, async (req, res) => {

  try {
    const { cardId } = req.body;
    if (!cardId) {
      res.status(401).send("No card id provide");
      return;
    }

    let card = await Card.findById({ _id: cardId });
    if (!card) {
      res.status(401).send("Card was not found");
      return;
    }

    let user = await User.findById({ _id: req.user._id });
    if (!user) {
      res.status(400).send("Sorry, this user is not exist :(");
      return;
    }

    let cardsArr = user.favoriteCards;

    cardsArr.map((id) => {
      if (id === cardId) {
        res.status(400).send("This product is already in your favorites");
        return;
      }
    })

    cardsArr = [...cardsArr, cardId];

    await User.findOneAndUpdate({ _id: req.user._id }, { favoriteCards: cardsArr });

    res.send('The product saved');

  } catch (err) {
    console.log("Something went wrong.", err);
    res.status(401).json({ message: "Something went wrong.", err });
  }

});


//Remove card to favorites
router.patch('/removeFavorite', auth, async (req, res) => {

  try {
    const { cardId } = req.body;
    if (!cardId) {
      res.status(401).send("No card id provide");
      return;
    }

    let card = await Card.findById({ _id: cardId });
    if (!card) {
      res.status(401).send("Card was not found");
      return;
    }

    let user = await User.findById({ _id: req.user._id });
    if (!user) {
      res.status(400).send("Sorry, this user is not exist :(");
      return;
    }

    let idCardsArr = user.favoriteCards;

    idCardsArr.map((id) => {
      if (id !== cardId) {
        res.status(400).send("This card is'nt in your favorites");
        return;
      }
    })

    idCardsArr = idCardsArr.filter((id) => {
      return id !== cardId;
    })

    await User.findOneAndUpdate({ _id: req.user._id }, { favoriteCards: idCardsArr })

    res.send('The product removed from favorites')
  } catch (err) {
    console.log("Something went wrong.", err);
    res.status(401).json({ message: "Something went wrong.", err });
  }

})


//Get all user favorite cards:
router.get('/favoriteCards', auth, async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user._id });
    const idCardsArr = user.favoriteCards;


    // idCardsArr.forEach(async (id) => {
    //   let card = await Card.findById({ _id: id });
    //   cardsArr.push(card);
    // });
    // console.log(cardsArr);
    // res.send(cardsArr);

    let cardsArr = [];
    idCardsArr.map(async (id) => {
      let card = await Card.findById({ _id: id });
      cardsArr = [...cardsArr, card];
    });

    res.send(cardsArr);

  } catch (err) {
    console.log("Something went wrong.", err);
    res.status(401).json({ message: "Something went wrong.", err });
  }

})


//forgot pwd:
router.post('/forgotPassword', async (req, res) => {
  try {
    const { error } = validateUpdateForgotPwd(req.body);

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
      from: 'hodaya1abu@gmail.com',
      to: email,
      subject: 'Password reset for SELL&BUY site',
      text: link
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

    // res.send(link)
  } catch (err) {
    res.status(401).json({ message: "Something went wrong.", err });
  }
});


router.get('/resetPassword/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;
    let user = await User.findOne({ _id: id });

    if (!user) {
      res.status(400).send('User Not Exists');
      return;
    }

    const verify = jwt.verify(token, config.get("jwtKey"));
    res.render("index", { email: verify.email, status: 'Not Verified' })
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Something went wrong.", err });
  }
});


router.post('/resetPassword/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;
    const { error } = validateUpdatePwd(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const { password } = req.body;
    console.log(password);

    let user = await User.findOne({ _id: id });

    if (!user) {
      res.status(400).send('User Not Exists');
      return;
    }

    const verify = jwt.verify(token, config.get("jwtKey"));
    if (!verify) {
      res.status(400).send('Invalid Token');
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10)

    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })

    res.render("index", { email: verify.email, status: 'Verified' })
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Something went wrong.", err });
  }
});





module.exports = router;
