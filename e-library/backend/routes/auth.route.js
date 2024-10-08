const express = require('express');
const {
    register,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/auth.controller');

const router = express.Router();    

// User registration route
router.post('/register', register);

// User login route
router.post('/login', loginUser);

// Route to get all users
router.get('/users', getAllUsers);

// Route to get a user by ID
router.get('/users/:id', getUserById);

// Route to update a user by ID
router.put('/users/:id', updateUser);

// Route to delete a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
