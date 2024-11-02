import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function RoomAvailabilityCalendar({ roomId }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  ); // Today's date

  useEffect(() => {
    consol;
    // Fetch availability for the room on the selected date
    fetch(`/rooms/${1}/availability?date=${selectedDate}`)
      .then(response => response.json())
      .then(data => {
        //     const events = data.map(slot => ({
        //       title: slot.isAvailable ? 'Available' : 'Unavailable',
        //       start: slot.start_time,
        //       end: slot.end_time,
        //       color: slot.isAvailable ? 'green' : 'red',
        //     }));
        //     setAvailableSlots(events);
      })
      .catch(error => console.error('Error fetching availability:', error));
  }, [roomId, selectedDate]);

  return (
    <div>
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </label>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={availableSlots}
      />
    </div>
  );
}

export default RoomAvailabilityCalendar;
