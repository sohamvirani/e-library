import React, { useEffect, useState } from 'react';
import { getBorrowedBooks } from '../services/bookService';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indication
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const books = await getBorrowedBooks();
                setBorrowedBooks(books);
            } catch (err) {
                setError('Error fetching borrowed books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBorrowedBooks();
    }, []);

    if (loading) {
        return <p>Loading borrowed books...</p>; // Loading state
    }

    if (error) {
        return <p>{error}</p>; // Display error if fetching fails
    }

    return (
        <div>
            <h2>Borrowed Books</h2>
            {borrowedBooks.length === 0 ? (
                <p>No borrowed books available.</p> // Message for no borrowed books
            ) : (
                <ul>
                    {borrowedBooks.map((book) => (
                        <BookDetails key={book._id} book={book} />
                    ))}
                </ul>
            )}
        </div>
    );
};

// Separate component for book details
const BookDetails = ({ book }) => (
    <li>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.genre}</p>
        <p>{book.publicationDate.split('T')[0]}</p>
    </li>
);

export default BorrowedBooks;
