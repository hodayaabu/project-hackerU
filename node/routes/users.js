const { validateUser, validateUpdateUser, validateUpdatePwd, validateUpdateForgotPwd } = require("../validations/user.validation");
const validateAuth = require('../validations/auth.validation');
const User = require("../model/users");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

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


//forgot pwd:
router.patch('/forgotPassword', async (req, res) => {
  try {
    const { error } = validateUpdateForgotPwd(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      let resetPassword = Math.random().toString(36).slice(-8);

      resetPassword = resetPassword.charAt(0).toLocaleUpperCase() + resetPassword.slice(1);

      let symbolsId = Math.round(Math.random() * 9);
      let symbols = ["!", "@", "#", "$", "%", "^", "=", "&", "_", "*"];

      resetPassword = resetPassword + symbols[symbolsId];

      const salt = await bcrypt.genSalt(12);
      let hashedResetPassword = await bcrypt.hash(resetPassword, salt);

      user = await User.findOneAndUpdate({ email: req.body.email }, hashedResetPassword);

      sendResetEmail(req.body.email, resetPassword);

      res.send("An email will be sent to you shortly.");
    } else {
      res.send("There are no user with this email.");
    }
  } catch (err) {
    res.status(401).json({ message: "Something went wrong.", err });
  }
});


// //Update pwd:
// router.patch('/resetPassword/:resetPassword/:email', async (req, res) => {
//   try {
//     let resetPassword = req.params.resetPassword;
//     let email = req.params.email;

//     const error1 = validateUpdateForgotPwd(email).error;

//     if (error1) {
//       res.status(400).send(error1.details[0].message);
//       return;
//     }

//     const error2 = validateUpdateUser(req.body).error;

//     if (error2) {
//       res.status(400).send(error2.details[0].message);
//       return;
//     }

//     const error3 = validateUpdatePwd(resetPassword).error;

//     if (error3) {
//       res.status(400).send(error3.details[0].message);
//       return;
//     }

//     let user = await User.findOne({ email});

//     if (user) {

//       let passwordChecker = await bcrypt.compareHash(resetPassword, user.hashedResetPassword);

//       if (passwordChecker) {
//         let hashedPassword = await bcrypt.createHash(validateData.password);
//         let updatedUserData = await userModel.updateUserData(userData.id, { password: hashedPassword });

//         res.json({ message: "You have successfully changed your password." });
//       } else {
//         res.json({ message: "The reset password is incorrect." });
//       }
//     } else {
//       res.json({ message: "There are no user with this email." });
//     }
//   } catch (err) {
//     res.status(401).json({ message: "Something went wrong.", err });
//   }
// });


// router.patch('/reset-password/:resetPassword/:email', async (req, res) => {
//   try {
//     let resetPassword = req.params.resetPassword;
//     let email = req.params.email;

//     let validateEmail = await userValidation.validateForgotPasswordSchema.validateAsync({ email });
//     let validateData = await userValidation.validateUpdateUsersSchema.validateAsync(req.body);
//     let validateResetPassword = await userValidation.validateUpdateUsersSchema.validateAsync({ password: resetPassword });

//     let databaseCheckerEmail = await userModel.selectUserByEmail(validateEmail.email);


//     if (databaseCheckerEmail.length === 1) {
//       let userData = databaseCheckerEmail[0];

//       let passwordChecker = await bcrypt.compareHash(validateResetPassword.password, userData.hashedResetPassword);

//       if (passwordChecker) {
//         let hashedPassword = await bcrypt.createHash(validateData.password);
//         let updatedUserData = await userModel.updateUserData(userData.id, { password: hashedPassword });

//         res.json({ message: "You have successfully changed your password." });
//       } else {
//         res.json({ message: "The reset password is incorrect." });
//       }
//     } else {
//       res.json({ message: "There are no user with this email." });
//     }
//   } catch (err) {
//     res.status(401).json({ message: "Something went wrong.", err });
//   }
// });




module.exports = router;