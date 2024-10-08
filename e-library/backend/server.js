const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const bookRoutes = require('./routes/book.route');
require('dotenv').config();

const app = express();

// Middleware for handling CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Allow access from frontend
  credentials: true,  // Allow cookies to be sent
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
