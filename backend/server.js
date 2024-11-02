const express = require('express');
const cors=require('cors');
const app = express();
const PORT = 3000;
const connection = require("./db")

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}))

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connection.connect(function(err){
        if(err) {throw err;}
        console.log("Database connected.")
    })
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