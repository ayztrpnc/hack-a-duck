import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Room = () => {
    const [desks, setDesks] = useState([]);  // Initialize as an empty array for fetched data
    const [bookingDay, setBookingDay] = useState('');
    const [bookingStartTime, setBookingStartTime] = useState('');
    const [bookingEndTime, setBookingEndTime] = useState('');
    const [selectedSeat, setSelectedSeat] = useState(null);  // Track currently selected seat
    const [userID, setUserID] = useState(1);  // Placeholder for userID, adjust as needed

    // Fetch desks data from the API on component mount
    useEffect(() => {
        const fetchDesks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/desks');
                const desksData = response.data.map(desk => ({
                    id: desk.deskID,
                    name: desk.deskName,
                    seats: Array(4).fill(false) // Assuming each desk has 4 seats initially, adjust as needed
                }));
                setDesks(desksData);
            } catch (error) {
                console.error("Error fetching desks data:", error);
            }
        };

        fetchDesks();
    }, []);

    // Save desks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('desks', JSON.stringify(desks));
    }, [desks]);

    // Function to handle seat selection
    const toggleSeat = (deskId, seatIndex) => {
        if (selectedSeat === null) {
            setSelectedSeat({ deskId, seatIndex });
        } else if (selectedSeat.deskId === deskId && selectedSeat.seatIndex === seatIndex) {
            setSelectedSeat(null);
        }
    };
    

    const handleBooking = async () => {
        if (selectedSeat !== null && userID) {
            const { deskId, seatIndex } = selectedSeat;
            const bookingDetails = {
                userID: userID, // Ensure this is set correctly
                deskID: deskId,
                bookingStart: `${bookingDay}T${bookingStartTime}`,
                bookingEnd: `${bookingDay}T${bookingEndTime}`,
                bookingDesc: `Booking for Desk ${deskId}, Seat ${seatIndex + 1}`
            };
    
            console.log("Booking details being sent:", bookingDetails); // Log details to see what you're sending
    
            try {
                const response = await axios.post('http://localhost:3000/booking', bookingDetails);
                console.log("Booking response:", response.data);
                // Mark the seat as booked in the local state
                setDesks(prevDesks =>
                    prevDesks.map(desk =>
                        desk.id === deskId
                            ? {
                                ...desk,
                                seats: desk.seats.map((seat, index) =>
                                    index === seatIndex ? true : seat
                                ),
                            }
                            : desk
                    )
                );
                alert(`Booking confirmed for Desk ${deskId}, Seat ${seatIndex + 1} on ${bookingDay} from ${bookingStartTime} to ${bookingEndTime}`);
                setSelectedSeat(null);
            } catch (error) {
                console.error("Error making booking:", error.response ? error.response.data : error);
                alert(`There was an error confirming your booking: ${error.response?.data?.message || error.message}. Please try again.`);
            }
        } else {
            alert("Please select a seat and provide your user ID to book.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Desks</h2>
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                <div className="flex flex-wrap justify-between">
                    {desks.map((desk) => (
                        <div
                            key={desk.id}
                            className="border p-4 m-2 rounded-lg shadow-md bg-white flex-1 min-w-[200px] max-w-[300px]"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{desk.name}</h3>
                            <div className="mt-2">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex flex-col items-center">
                                        {/* Top Seats */}
                                        <div className="flex justify-center space-x-2">
                                            {desk.seats.slice(0, 2).map((seat, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => toggleSeat(desk.id, index)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${seat ? 'bg-red-500 border-red-600' : (selectedSeat && selectedSeat.deskId === desk.id && selectedSeat.seatIndex === index ? 'bg-gray-400' : 'bg-green-500 border-green-600')}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{seat ? 'Booked' : 'Available'}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Table */}
                                        <div className="w-full h-20 bg-gray-300 rounded-lg shadow-md flex items-center justify-center mt-2 mb-2">
                                            <span className="text-center block text-gray-600 font-semibold">Table</span>
                                        </div>
                                        {/* Bottom Seats */}
                                        <div className="flex justify-center space-x-2">
                                            {desk.seats.slice(2).map((seat, index) => (
                                                <div
                                                    key={index + 2} // Adjusting index for the bottom seats
                                                    onClick={() => toggleSeat(desk.id, index + 2)} // Adding 2 to the index for bottom seats
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${seat ? 'bg-red-500 border-red-600' : (selectedSeat && selectedSeat.deskId === desk.id && selectedSeat.seatIndex === index + 2 ? 'bg-gray-400' : 'bg-green-500 border-green-600')}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{seat ? 'Booked' : 'Available'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Shared Booking Details Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Booking Details</h3>
                    <label className="block text-sm font-medium text-gray-700">Booking Day:</label>
                    <input
                        type="date"
                        value={bookingDay}
                        onChange={(e) => setBookingDay(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex justify-between mt-2">
                        <div className="w-1/2 pr-1">
                            <label className="block text-sm font-medium text-gray-700">Start Time:</label>
                            <input
                                type="time"
                                value={bookingStartTime}
                                onChange={(e) => setBookingStartTime(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="w-1/2 pl-1">
                            <label className="block text-sm font-medium text-gray-700">End Time:</label>
                            <input
                                type="time"
                                value={bookingEndTime}
                                onChange={(e) => setBookingEndTime(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Room;
