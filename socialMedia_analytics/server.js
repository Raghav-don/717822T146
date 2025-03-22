const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3050;

dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("Received Token:", token); // Debugging output

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(403).json({ error: 'Invalid token.', details: err.message });
        }
        req.user = user;
        next();
    });
}


// Mock function to simulate fetching users from a database
async function getUsersFromDatabase() {
    return [
        { id: 1, name: 'John Doe', posts: 15 },
        { id: 2, name: 'Jane Smith', posts: 12 },
        { id: 3, name: 'Alice Brown', posts: 9 },
    ];
}

// Protected route to fetch users
app.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await getUsersFromDatabase();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
