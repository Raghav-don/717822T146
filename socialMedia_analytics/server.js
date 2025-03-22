const express = require('express');
 const jwt = require('jsonwebtoken');
    const dotenv = require('dotenv');

dotenv.config();

const app = express();



const PORT = process.env.PORT || 3050;

app.use(express.json());




function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];


    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {

        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token,process.env.JWT_SECRET,   (err, user) => {


        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}


async function getUsersFromDatabase() {
    return [
        { id: 1,   name: 'John Doe', posts: 15 },
        { id: 2,  name: 'Jane Smith', posts:  12 },
        { id: 3,   name: 'Alice Brown', posts:  9 }
    ];
}


       async      function getCommentsFromDatabase (postId) {
    const comments = {
        150: [
            { id: 3893, postid: 150, content: "Old comment" },
            { id: 4791, postid: 150, content: "Boring comment" }
        ]
    };
    return comments[postId] || [];
}


        app.get('/users', authenticateToken, async (req, res) => {
    try {
            const users = await getUsersFromDatabase();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


          app.get('/test/posts/:postid/comments', authenticateToken, async (req, res) => {
      try {
        const postId = req.params.postid;
           const comments = await getCommentsFromDatabase(postId);
        res.json({ comments });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
