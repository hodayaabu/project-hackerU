const { validateCard, validateUpdateCard } = require("../validations/card.validation");
const { Card, generateDate } = require("../model/cards");
const User = require('../model/users');
const auth = require("../middleware/auth");

const express = require('express');
const router = express.Router();

//Get all cards:
router.get('/allCards', async (req, res) => {
    try {

        const allCards = await Card.find();

        if (allCards.length < 1) {
            res.status(400).send('Sorry, there are no registered cards yet');
            return;
        }

        res.send(allCards);

    } catch (err) {
        console.log('err from get all cards:', err);
        res.status(401).json({ err });
    }
});


//Add new card:
router.post('/', auth, async (req, res) => {
    try {

        //Validation for the data from the user:
        const { error } = validateCard(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        const user = await User.findOne({ _id: req.user._id });

        const card = new Card({
            userId: req.user._id,
            name: user.name,
            phone: user.phone,
            ...req.body,
            creationDate: generateDate(),
        });

        await card.save();
        const myAllCards = await Card.find({ userId: user._id });

        res.send(myAllCards);

    } catch (err) {
        console.log('err from add new card:', err);
        res.status(401).send(err);
    }
});

//Get card by id:
router.get('/myCard', async (req, res) => {
    const id = req.header("id-card");

    if (!id) {
        res.status(401).send("No card id provide");
        return;
    }

    try {
        const card = await Card.findById({ _id: id });
        if (!card) {
            res.status(404).send('The card with the given id was not found');
            return;
        }
        res.send(card);

    } catch (err) {
        res.status(401).json({ err });
    }
});


//Update card:
router.patch('/myCard', auth, async (req, res) => {
    const id = req.header("id-card");

    if (!id) {
        res.status(401).send("No card id provide");
        return;
    }

    try {
        //Validation for the data from the user:
        const { error } = validateUpdateCard(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const card = await Card.findByIdAndUpdate({ _id: id }, req.body);

        if (!card) {
            res.status(404).send('The card with the given id was not found');
            return;
        }

        const allCards = await Card.find();

        res.send(allCards);
    } catch (err) {
        console.log('err from update-card:', err);
        res.status(401).json({ err })
    }
});


//Delete card:
router.delete('/myCard', auth, async (req, res) => {

    const id = req.header("id-card");

    if (!id) {
        res.status(401).send("No card id provide");
        return;
    }

    try {

        const card = await Card.findByIdAndRemove({ _id: id });

        if (!card) {
            res.status(404).send('The card with the given id was not found');
            return;
        }

        const myAllCards = await Card.find({ userId: req.user._id });

        if (!myAllCards) {
            res.status(404).send('Sorry, we did not find any cards under the requested user');
            return;
        }

        res.send(myAllCards);

    } catch (err) {
        console.log('err from delete-card:', err);
        res.status(401).json({ err })
    }
});

//Get all user cards:
router.get('/myAllCards', auth, async (req, res) => {
    try {
        const myAllCards = await Card.find({ userId: req.user._id });

        if (!myAllCards) {
            res.status(404).send('Sorry, we did not find any cards under the requested user');
            return;
        }

        res.send(myAllCards);
    } catch (err) {
        console.log('err from get my all cards:', err);
        res.status(401).json({ err });
    }
});
module.exports = router;