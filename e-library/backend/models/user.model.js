const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 12); // Hash the password
        next(); // Proceed to the next middleware
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

// Method to compare input password with hashed password
userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password); // Compare the passwords
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
