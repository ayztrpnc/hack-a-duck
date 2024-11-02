const express = require("express");
const router = express.Router();
const connection = require("../db");
// const getRoomAvailability = require("../getRoomAvailability"); // Adjust path as needed

// Get general room details
router.get('/', (req, res) => {
    const sqlQuery = "SELECT * FROM Room";
    connection.query(sqlQuery, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Get room availability for a specific date
// Assuming your router file
router.get('/:roomId/availability', async (req, res) => {
    const { roomId } = req.params;
    const { date } = req.query; // Expecting date in 'YYYY-MM-DD' format

    try {
        const availability = await getRoomAvailability(roomId, date);
        res.json(availability);
    } catch (error) {
        console.error("Error fetching availability:", error);
        res.status(500).send("Error fetching availability");
    }
});


module.exports = router;

const getRoomAvailability = async (roomId, date) => {
    // Convert the date to the correct format if needed
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Ensures 'YYYY-MM-DD'

    const startOfDay = `${formattedDate} 00:00:00`;
    const endOfDay = `${formattedDate} 23:59:59`;

    // Query to find all desks in the specified room
    const desksInRoomQuery = `SELECT deskID FROM desk WHERE roomID = ?`;

    // Query to find bookings for a given desk on the specified date
    const bookingQuery = `
        SELECT deskID, bookingStart, bookingEnd 
        FROM booking
        WHERE deskID = ? AND 
        ((bookingStart >= ? AND bookingStart < ?) OR 
        (bookingEnd > ? AND bookingEnd <= ?) OR
        (bookingStart < ? AND bookingEnd > ?))
    `;

    try {
        // Step 1: Fetch all desk IDs for the specified room
        const [desks] = await connection.promise().query(desksInRoomQuery, [roomId]);
        const deskIDs = desks.map(desk => desk.deskID); // Extract desk IDs

        // Step 2: Check each desk's availability for the given date
        const availability = await Promise.all(deskIDs.map(async (deskID) => {
            const [bookings] = await connection.promise().query(
                bookingQuery, 
                [deskID, startOfDay, endOfDay, startOfDay, endOfDay, startOfDay, endOfDay]
            );

            // If no bookings found, the desk is available
            return {
                deskID: deskID,
                isAvailable: bookings.length === 0,
                bookedSlots: bookings.map(booking => ({
                    start_time: booking.bookingStart,
                    end_time: booking.bookingEnd
                }))
            };
        }));

        return availability;
    } catch (error) {
        console.error("Error fetching room availability:", error);
        throw error;
    }
};

