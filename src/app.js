const express = require('express');
const app = express();

app.use(express.json());

const booksRoute = require('./routes/books');
const authRoute = require('./routes/auth');

app.use('/books', booksRoute);
app.use('/auth', authRoute);

module.exports = app;
