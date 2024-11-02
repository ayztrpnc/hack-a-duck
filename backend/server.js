const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const connection = require("./db")

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connection.connect(function(err){
        if(err) {throw err;}
        console.log("Database connected.")
    })
});

// POST request to create a new booking
app.post("/booking", (req, res) => {
    // Extract the necessary fields from the request body
    const { userID, deskID, bookingStart, bookingEnd, bookingDesc } = req.body;
 
    // SQL query to insert a new booking
    const insertBookingQuery = `
        INSERT INTO booking (userID, deskID, bookingStart, bookingEnd, bookingDesc)
        VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(insertBookingQuery, [userID, deskID, bookingStart, bookingEnd, bookingDesc], function(err, result) {
        if (err) {
            res.status(500).send("Error executing the query.");
            return;
        }
        res.status(201).send("Booking created successfully!");
    });
});

const userRouter = require("./routes/users")
const floorRouter = require("./routes/floors")
const roleRouter = require("./routes/roles")
const roomRouter = require("./routes/rooms")
const deskRouter = require("./routes/desks")
app.use("/users", userRouter)
app.use("/floors", floorRouter)
app.use("/roles", roleRouter)
app.use("/rooms", roomRouter)
app.use("/desks", deskRouter)