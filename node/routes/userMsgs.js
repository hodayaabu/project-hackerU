const validateUserMsg = require("../validations/userMsg.validation");
const User = require("../model/users");
const UserMsg = require("../model/userMsg");
const authAdmin = require("../middleware/authAdmin");

const express = require('express');

const router = express.Router();

//Get all user messages:
router.get('/allUsersMsg', authAdmin, async (req, res) => {
    try {
        const allUserMsgs = await UserMsg.find();
        if (allUserMsgs.length < 1) {
            res.status(400).send('Sorry, there are no messages from users yet');
            return;
        }
        res.send(allUserMsgs);
    } catch (err) {
        console.log('err from get allUserMsgs:', err);
        res.status(401).send(err);
    }
});

//Add new userMsg:
router.post('/newMsg', async (req, res) => {
    try {
        //Validation for the data from the user:
        const { error } = validateUserMsg(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        //Check in the database if user already exists by email:
        let user = await User.findOne({ email: req.body.email });

        const userMsg = new UserMsg({
            userId: user ? user._id : null,
            ...req.body
        });

        await userMsg.save();

        res.send('Your message has been saved and we will get back to you soon');

    } catch (err) {
        console.log('err from add new user msg:', err);
        res.status(401).send(err);
    }
});

module.exports = router;
