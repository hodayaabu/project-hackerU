const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const userMsgsRouter = require('./routes/userMsgs');
const cardsRouter = require('./routes/cards');

const app = express();

//Connect to db:
mongoose
  .connect("mongodb://localhost/final_project_api")
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.log('Could not connect to mongodb', err);
  });

//Apply middleware:
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routeing:
app.use('/users', usersRouter);
app.use('/msgs', userMsgsRouter);
app.use('/cards', cardsRouter);


//Connected to port:
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
})

module.exports = app;
