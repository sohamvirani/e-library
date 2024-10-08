import React, { useState } from 'react';
import { addBook } from '../services/bookService';

const AddBookForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        publicationDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addBook(formData).then(() => {
            alert(`${formData.title} has been successfully added to the library!`);
            setFormData({
                title: '',
                author: '',
                genre: '',
                publicationDate: ''
            });
        });
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Title"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    placeholder="Author"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    placeholder="Genre"
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="publicationDate"
                    value={formData.publicationDate}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookForm;
