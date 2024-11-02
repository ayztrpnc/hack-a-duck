const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get general room details
router.get('/', (req, res) => {
  const sqlQuery = 'SELECT * FROM Room';
  connection.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// Get room availability for a specific date
router.get('/:roomId/availability', async (req, res) => {
  const { roomId } = req.params;
  const { date } = req.query; // Expecting date in 'YYYY-MM-DD' format

  try {
    const availability = await getRoomAvailability(roomId, date);
    res.json(availability);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).send('Error fetching availability');
  }
});

module.exports = router;

const getRoomAvailability = async (roomId, date) => {
  const startOfDay = `${date}T07:00:00`;
  const endOfDay = `${date}T21:00:00`;

  const desksInRoomQuery = `SELECT deskID FROM desk WHERE roomID = ?`;
  const bookingQuery = `
        SELECT deskID, bookingStart, bookingEnd 
        FROM booking
        WHERE deskID = ? AND 
          ((bookingStart >= ? AND bookingStart <= ?) OR 
           (bookingEnd >= ? AND bookingEnd <= ?) OR
           (bookingStart <= ? AND bookingEnd >= ?))
      `;

  try {
    const [desks] = await connection
      .promise()
      .query(desksInRoomQuery, [roomId]);
    const deskIDs = desks.map(desk => desk.deskID);

    const availability = await Promise.all(
      deskIDs.map(async deskID => {
        // Query to get bookings for the desk
        const [bookings] = await connection
          .promise()
          .query(bookingQuery, [
            deskID,
            startOfDay,
            endOfDay,
            startOfDay,
            endOfDay,
            startOfDay,
            endOfDay,
          ]);

        // Start with default availability for the entire time range
        let finalAvailability = [
          { start_time: startOfDay, end_time: endOfDay, isAvailable: true },
        ];

        // Overlay bookings to split the default availability into available and booked slots
        bookings.forEach(booking => {
          finalAvailability = splitAvailability(
            finalAvailability,
            booking.bookingStart,
            booking.bookingEnd
          );
        });

        return {
          deskID: deskID,
          timeSlots: finalAvailability,
        };
      })
    );

    return availability;
  } catch (error) {
    console.error('Error fetching room availability:', error);
    throw error;
  }
};

// Helper function to split availability slots based on bookings
const splitAvailability = (availability, bookingStart, bookingEnd) => {
  const newAvailability = [];

  availability.forEach(slot => {
    const slotStart = new Date(slot.start_time);
    const slotEnd = new Date(slot.end_time);
    const bookingStartTime = new Date(bookingStart);
    const bookingEndTime = new Date(bookingEnd);

    // Case 1: Booking completely covers the slot
    if (bookingStartTime <= slotStart && bookingEndTime >= slotEnd) {
      newAvailability.push({ ...slot, isAvailable: false });
    }
    // Case 2: Booking starts within the slot and ends after the slot starts
    else if (bookingStartTime > slotStart && bookingStartTime < slotEnd) {
      // Slot before the booking
      newAvailability.push({
        start_time: slot.start_time,
        end_time: bookingStart,
        isAvailable: true,
      });
      // Booked slot
      newAvailability.push({
        start_time: bookingStart,
        end_time: bookingEnd < slotEnd ? bookingEnd : slot.end_time,
        isAvailable: false,
      });

      // If the booking ends before the slot ends, add remaining free time
      if (bookingEndTime < slotEnd) {
        newAvailability.push({
          start_time: bookingEnd,
          end_time: slot.end_time,
          isAvailable: true,
        });
      }
    }
    // Case 3: Booking ends within the slot but starts before the slot
    else if (bookingEndTime > slotStart && bookingEndTime < slotEnd) {
      newAvailability.push({
        start_time: slot.start_time,
        end_time: bookingEnd,
        isAvailable: false,
      });
      // Remaining available slot after the booking
      newAvailability.push({
        start_time: bookingEnd,
        end_time: slot.end_time,
        isAvailable: true,
      });
    }
    // Case 4: Booking does not overlap, keep slot as is
    else {
      newAvailability.push(slot);
    }
  });

  return newAvailability;
};
