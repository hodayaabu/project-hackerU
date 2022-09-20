const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

//Create the schema for the users in the db:
const userMsgSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 225,
        required: true,
    },
    email: {
        type: String,
        minlength: 9,
        maxlength: 225,
        required: true,
        unique: true
    },
    msg: {
        type: String,
        minlength: 3,
        maxlength: 2225,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

});

//Add to the collection in db:
const UserMsg = mongoose.model("UserMsg", userMsgSchema, "userMsgs");

module.exports = UserMsg;