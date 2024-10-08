const express = require('express');
const {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
} = require('../controllers/book.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Route to create a new book
router.post('/books', authMiddleware, createBook);

// Route to get all books
router.get('/books', getBooks);

// Route to update a book by ID
router.put('/books/:id', authMiddleware, updateBook);

// Route to delete a book by ID
router.delete('/books/:id', authMiddleware, deleteBook);

// Route to borrow a book by ID
router.post('/books/:id/borrow', authMiddleware, borrowBook);

// Route to return a borrowed book by ID
router.post('/books/:id/return', authMiddleware, returnBook);

module.exports = router;
