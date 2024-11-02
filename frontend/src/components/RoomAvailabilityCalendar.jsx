import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function RoomAvailabilityCalendar({ roomId }) {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/rooms/${roomId}/availability?date=${selectedDate}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const availabilityData = await response.json();
        console.log('Availability Data:', availabilityData);

        // Map the availability data to calendar events
        const calendarEvents = availabilityData.flatMap(desk => {
          return desk.timeSlots.map(slot => ({
            title: slot.isAvailable
              ? `Desk ${desk.deskID} Available`
              : `Desk ${desk.deskID} Booked`,
            start: slot.start_time,
            end: slot.end_time,
            color: slot.isAvailable ? 'green' : 'red',
          }));
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [roomId, selectedDate]);

  // Function to navigate to the room booking page
  const navigateToRoomBooking = () => {
    window.location.href = `/room-selection`;
  };

  return (
    <div>
      <h2>Desk Booking Calendar</h2>

      {/* Date Picker for Selecting Date */}
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
      />

      {/* Button to navigate to room booking page */}
      <button onClick={navigateToRoomBooking} style={{ margin: '10px 0' }}>
        Go to Room {roomId} Booking Page
      </button>

      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
        height="auto"
      />
    </div>
  );
}

export default RoomAvailabilityCalendar;
