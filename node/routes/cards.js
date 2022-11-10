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

        //Validation the data from the user:
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

        // Finding all the user's cards
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

        const myAllCards = await Card.find({ userId: req.user._id });

        res.send(myAllCards);

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
            res.status(404).send('Sorry, we did not find any cards');
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
            res.status(404).send('Sorry, we did not find any cards');
            return;
        }

        res.send(myAllCards);
    } catch (err) {
        console.log('err from get my all cards:', err);
        res.status(401).json({ err });
    }
});


//Get all user favorite cards:
router.get('/favoriteCards', auth, async (req, res) => {
    try {
        let user = await User.findById({ _id: req.user._id });
        if (!user) {
            res.status(400).send("Sorry, this user is not exist :(");
            return;
        }

        //Finding the cards that in the user's favorite array
        const favoriteCards = await Card.find({
            '_id': { $in: user.favoriteCards }
        });

        if (favoriteCards.length < 0) {
            res.send("There is no favorite product yet:(");
            return;
        }

        res.send(favoriteCards)

    } catch (err) {
        console.log("Something went wrong.", err);
        res.status(401).json({ message: "Something went wrong.", err });
    }

})


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

        // Checking if the card is already in the favorite's array
        cardsArr.map((id) => {
            if (id === cardId) {
                res.status(400).send("This product is already in your favorites");
                return;
            }
        })

        //Adding the card to the favorite's array
        cardsArr = [...cardsArr, cardId];

        //Updating the user with the new favorites array
        await User.findOneAndUpdate({ _id: req.user._id }, { favoriteCards: cardsArr });

        res.send('The product saved');

    } catch (err) {
        console.log("Something went wrong.", err);
        res.status(401).json({ message: "Something went wrong.", err });
    }

});


//Remove card from favorites
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

        //Removal card of the favorite's array
        idCardsArr = idCardsArr.filter((id) => {
            return id !== cardId;
        })

        //Updating the user with the new favorites array
        await User.findOneAndUpdate({ _id: req.user._id }, { favoriteCards: idCardsArr });

        user = await User.findById({ _id: req.user._id });

        //Finding the cards that in the user's favorite array
        const favoriteCards = await Card.find({
            '_id': { $in: user.favoriteCards }
        });

        res.send(favoriteCards);

    } catch (err) {
        console.log("Something went wrong.", err);
        res.status(401).json({ message: "Something went wrong.", err });
    }
});

//Get all cards by type:
router.get('/:type', async (req, res) => {
    try {
        const cardsByType = await Card.find({ productType: req.params.type });

        if (cardsByType.length < 1) {
            res.status(404).send(`Sorry, we did not find any cards under ${req.params.type} category`);
            return;
        }

        res.send(cardsByType);

    } catch (err) {
        console.log('err from get my all cards by type:', err);
        res.status(401).json({ err });
    }
});


module.exports = router;