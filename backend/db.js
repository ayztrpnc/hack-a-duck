const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    database: "hack_a_duck",
    user: "root",
    password: "root"
});

module.exports = connection;