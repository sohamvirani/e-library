const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
