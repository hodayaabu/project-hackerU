const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

//Create the schema for the users in the db:
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 225,
        required: true,
    },
    city: {
        type: String,
        minlength: 4,
        maxlength: 54,
        required: true,
    },
    email: {
        type: String,
        minlength: 9,
        maxlength: 225,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 225,
        required: true,
    },
    phone: {
        type: String,
        minlength: 9,
        maxlength: 13,
        required: true,
    },
    favoriteCards: {
        type: Array,
    },
    admin: {
        type: Boolean,
    }
});

//Create new method to generate auth token for user:
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, admin: this.admin }, config.get("jwtKey"));
}

//Add to the collection in db:
const User = mongoose.model("User", userSchema, "users");

module.exports = User;