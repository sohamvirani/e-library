import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import BookItem from './BookItem';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indication
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getBooks();
                setBooks(fetchedBooks);
            } catch (err) {
                setError('Failed to fetch books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <p>Loading books...</p>; // Loading state
    }

    if (error) {
        return <p>{error}</p>; // Display error if fetching fails
    }

    return (
        <div>
            <h2>Available Books</h2>
            {books.length === 0 ? (
                <p>No books available.</p> // Message for empty book list
            ) : (
                <ul>
                    {books.map((book) => (
                        <BookItem key={book._id} book={book} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;
