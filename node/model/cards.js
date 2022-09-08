const mongoose = require("mongoose");

//Create the schema for the cards in the db:
const cardsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 225,
        required: true,
    },
    phone: {
        type: String,
        minlength: 9,
        maxlength: 13,
        required: true,
    },
    image: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        required: true
    },
    description: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        required: true
    },
    price: {
        type: String,
        minlength: 1,
        maxlength: 1024,
        required: true
    },
    creationDate: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        required: true
    }
});

const generateDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

//Add to the collection in db:
const Card = mongoose.model("Card", cardsSchema, "cards");

module.exports = { Card, generateDate };