const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    database: "hack_a_duck",
    user: "root",
    password: "54262424@"
});

module.exports = connection;