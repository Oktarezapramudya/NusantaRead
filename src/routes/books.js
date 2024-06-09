const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getBooks);
router.get('/:bookId', booksController.getBookById);
router.post('/read', booksController.recordReading);

module.exports = router;
