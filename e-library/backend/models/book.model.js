const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'] 
    },
    author: { 
        type: String, 
        required: [true, 'Author is required'] 
    },
    genre: { 
        type: String, 
        required: [true, 'Genre is required'] 
    },
    available: { 
        type: Boolean, 
        default: true 
    },
    borrowedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null 
    }
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
