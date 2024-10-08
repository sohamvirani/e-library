import React from 'react';
import { borrowBook, returnBook } from '../services/bookService';

const BookItem = ({ book }) => {
    const handleBorrow = async () => {
        try {
            await borrowBook(book._id);
            alert(`You have successfully borrowed "${book.title}".`);
        } catch (error) {
            alert(`Failed to borrow "${book.title}". Please try again.`);
        }
    };

    const handleReturn = async () => {
        try {
            await returnBook(book._id);
            alert(`You have successfully returned "${book.title}".`);
        } catch (error) {
            alert(`Failed to return "${book.title}". Please try again.`);
        }
    };

    return (
        <li>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Published on: {new Date(book.publicationDate).toLocaleDateString()}</p>
            {book.isBorrowed ? (
                <button onClick={handleReturn}>Return Book</button>
            ) : (
                <button onClick={handleBorrow}>Borrow Book</button>
            )}
        </li>
    );
};

export default BookItem;
