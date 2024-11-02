import React, { useState, useEffect } from 'react';

const Room = () => {
    const initialDesks = [
        { id: 1, name: "Desk 1", seats: Array(4).fill(false) },
        { id: 2, name: "Desk 2", seats: Array(4).fill(false) },
        { id: 3, name: "Desk 3", seats: Array(6).fill(false) }, 
    ];

    const [desks, setDesks] = useState(initialDesks);
    const [bookingDay, setBookingDay] = useState('');
    const [bookingStartTime, setBookingStartTime] = useState('');
    const [bookingEndTime, setBookingEndTime] = useState('');

    // Load desks from local storage on component mount
    useEffect(() => {
        const storedDesks = localStorage.getItem('desks');
        if (storedDesks) {
            setDesks(JSON.parse(storedDesks));
        }
    }, []);

    // Save desks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('desks', JSON.stringify(desks));
    }, [desks]);

    // Function to toggle booking a seat
    const toggleSeat = (deskId, seatIndex) => {
        setDesks(prevDesks =>
            prevDesks.map(desk =>
                desk.id === deskId
                    ? {
                        ...desk,
                        seats: desk.seats.map((seat, index) =>
                            index === seatIndex ? !seat : seat // Toggle the seat
                        ),
                    }
                    : desk
            )
        );
    };

    // Function to handle the booking for all desks
    const handleBooking = () => {
        console.log(`Booking Day: ${bookingDay}, Start Time: ${bookingStartTime}, End Time: ${bookingEndTime}`);
        alert(`Booking confirmed for ${bookingDay} from ${bookingStartTime} to ${bookingEndTime}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Desks</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap justify-between">
                    {desks.map((desk) => (
                        <div
                            key={desk.id}
                            className="border p-4 m-2 rounded-lg shadow-md bg-white flex-1 min-w-[200px] max-w-[300px]"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{desk.name}</h3>
                            <div className="mt-2">
                                {/* Box-style layout for seats with a larger table representation */}
                                <div className="grid grid-cols-1 gap-2">
                                    {desk.id === 3 ? (
                                        // Desk 3 Layout
                                        <>
                                            {/* Three Seats Above the Table */}
                                            <div className="flex justify-between">
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 0)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[0] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[0] ? 'Booked' : 'Available'}</span>
                                                </div>
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 1)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[1] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[1] ? 'Booked' : 'Available'}</span>
                                                </div>
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 2)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[2] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[2] ? 'Booked' : 'Available'}</span>
                                                </div>
                                            </div>
                                            {/* Larger Table Representation */}
                                            <div className="flex justify-center items-center">
                                                <div className="w-full h-40 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                                                    <span className="text-center block text-gray-600 font-semibold">Table</span>
                                                </div>
                                            </div>
                                            {/* Three Seats Below the Table */}
                                            <div className="flex justify-between">
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 3)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[3] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[3] ? 'Booked' : 'Available'}</span>
                                                </div>
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 4)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[4] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[4] ? 'Booked' : 'Available'}</span>
                                                </div>
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 5)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[5] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[5] ? 'Booked' : 'Available'}</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // Layout for Desks 1 and 2
                                        <>
                                            {/* Seats Above the Table */}
                                            <div className="flex justify-between">
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 0)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[0] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[0] ? 'Booked' : 'Available'}</span>
                                                </div>
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 1)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[1] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[1] ? 'Booked' : 'Available'}</span>
                                                </div>
                                            </div>
                                            {/* Larger Table Representation */}
                                            <div className="flex justify-center items-center">
                                                <div className="w-full h-32 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                                                    <span className="text-center block text-gray-600 font-semibold">Table</span>
                                                </div>
                                            </div>
                                            {/* Seats Below the Table */}
                                            <div className="flex justify-between">
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 2)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[2] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[2] ? 'Booked' : 'Available'}</span>
                                                </div>
                                                <div
                                                    onClick={() => toggleSeat(desk.id, 3)}
                                                    className={`flex items-center justify-center p-3 rounded-lg border transition duration-200 cursor-pointer 
                                                        ${desk.seats[3] ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'}
                                                        hover:opacity-80`}
                                                >
                                                    <span className="text-white font-semibold">{desk.seats[3] ? 'Booked' : 'Available'}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
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
