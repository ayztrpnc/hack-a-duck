const express = require("express")
const router = express.Router()
const connection = require("../db")

// Fetch all user data
router.get('/', (req, res) => {
    const sqlQuery = "SELECT * FROM User";
    connection.query(sqlQuery, function(err, result){
        if (err){throw err;}
        res.send(result);
    })
});

// Login POST Request
router.post("/login", (req, res) => {
    const {username, pword} = req.body;

    if (pword.length <= 0) {
        res.status(401).send("Password cannot be empty.");
        return;
    }
    
    // TODO: More validation
    const sqlQuery = "SELECT * FROM User WHERE username = ? AND pword = ?";
    connection.query(sqlQuery, [username, pword], function(err, result) {
        if (err) {
            res.status(500).send("Error executing the query");
            return;
        }

        if (result.length > 0) {
            res.status(200).send("Successfully logged in.");
        } else {
            res.status(401).send("Invalid credentials.")
        }
    });
});

// Register POST Request
router.post("/register", (req, res) => {
    const {username, pword, firstName, lastName, email} = req.body;
    const roleID = 1;

    const checkUserQuery = "SELECT * FROM User WHERE username = ?";
    connection.query(checkUserQuery, [username], function(err, result) {
        if (err) {
            res.status(500).send("Error executing the query.");
            return;
        }
        if (result.length > 0) {
            res.status(409).send("Username already exists.");
        } else {
            const insertUserQuery = "INSERT INTO User(roleID, username, pword, firstName, lastName, email) VALUES (?, ?, ?, ?, ?, ?)";
            connection.query(insertUserQuery, [roleID, username, pword, firstName, lastName, email],
                function(err, result) {
                    if (err) {
                        res.status(500).send("Error executing the queryy.");
                        return;
                    }
                    res.status(201).send("Registration successful.")
                }
            )
        }
    })
})

module.exports = router;