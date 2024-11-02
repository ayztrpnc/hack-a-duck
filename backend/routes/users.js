const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); // Make sure to install this package
const router = express.Router();
const connection = require("../db");

// User Registration
router.post('/register2', async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const roleID = 1;

    // Hash the password before storing it
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertQuery = 'INSERT INTO users (roleID, username, pword, firstName, lastName, email) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(insertQuery, [roleID, userName, password, firstName, lastName, email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error while inserting user' });
        }

        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// User Login
router.post('/register-login', async (req, res) => {
    const { userName, password } = req.body;

    // Validate input
    if (!userName || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the user exists
    const query = 'SELECT * FROM user WHERE username = ?';
    connection.query(query, [userName], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        console.log('Results:', results);
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' }); // User not found
        }

        const user = results[0];

        // Compare passwords
        if(password=== user.pword){
            isPasswordValid=true;
        };
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

        // Send token to client
        res.json({ token });
        res.json({ token, message: 'Login successful!' });
    });
});

module.exports = router;
