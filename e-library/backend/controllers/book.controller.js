const Book = require('../models/book.model');

// Create a new book
exports.createBook = async (req, res) => {
    const bookData = req.body;

    try {
        const newBook = new Book(bookData);
        await newBook.save();
        return res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        return res.status(400).json({ message: 'Error creating book' });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        return res.status(200).json(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(400).json({ message: 'Error fetching books' });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        return res.status(400).json({ message: 'Error updating book' });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        return res.status(400).json({ message: 'Error deleting book' });
    }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
    const { id } = req.params;

    try {
        const bookToBorrow = await Book.findById(id);
        if (!bookToBorrow || !bookToBorrow.available) {
            return res.status(400).json({ message: 'Book not available' });
        }
        bookToBorrow.available = false;
        bookToBorrow.borrowedBy = req.userId;
        await bookToBorrow.save();
        return res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        console.error('Error borrowing book:', error);
        return res.status(400).json({ message: 'Error borrowing book' });
    }
};

// Return a borrowed book
exports.returnBook = async (req, res) => {
    const { id } = req.params;

    try {
        const bookToReturn = await Book.findById(id);
        if (!bookToReturn || bookToReturn.available) {
            return res.status(400).json({ message: 'Book is already returned' });
        }
        bookToReturn.available = true;
        bookToReturn.borrowedBy = null;
        await bookToReturn.save();
        return res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        console.error('Error returning book:', error);
        return res.status(400).json({ message: 'Error returning book' });
    }
};
