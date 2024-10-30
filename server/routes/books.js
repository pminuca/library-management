const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers/getBooks');
const { addBooks } = require('../controllers/addBook');
const { deleteBook } = require('../controllers/deleteBook');
const { updateBook } = require('../controllers/updateBook');

router.get('/books', getBooks);
router.post('/books', addBooks);
router.delete('/books/:id', deleteBook);
router.put('/books/:id', updateBook);

module.exports = router;
