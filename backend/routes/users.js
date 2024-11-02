const express = require("express")
const router = express.Router()
const connection = require("../db")

router.get('/', (req, res) => {
    const sqlQuery = "SELECT * FROM User";
    connection.query(sqlQuery, function(err, result){
        if (err){throw err;}
        res.send(result);
    })
});

module.exports = router;