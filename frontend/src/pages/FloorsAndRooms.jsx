import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FloorPlanModal from './FloorPlanModal';

function FloorsAndRooms() {
    const [expandedFloor, setExpandedFloor] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/rooms')
            .then(response => {
                console.log('Fetched rooms:', response.data);
                setRooms(response.data);
            })
            .catch(error => console.error("Error fetching room data:", error));
    }, []);

    const openFloorPlan = (floor) => {
        setExpandedFloor(floor);
        setIsModalOpen(true);
    };

    const openRoom = (room) => {
        setSelectedRoom(room);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setExpandedFloor(null);
        setSelectedRoom(null);
    };

    const handleDeskUsageChange = (roomId, deskIndex, newUsage) => {
        setRooms(prevRooms =>
            prevRooms.map(room =>
                room.id === roomId
                    ? {
                        ...room,
                        desks: room.desks.map((desk, index) =>
                            index === deskIndex ? {...desk, usage: newUsage} : desk
                        )
                    }
                    : room
            )
        );
    };

    const getProgressColor = (usage) => {
        if (usage < 50) return 'bg-green-400';
        if (usage < 80) return 'bg-yellow-400';
        return 'bg-red-400';
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen p-6 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Building Map</h2>
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
                {[1, 2, 3].map((floor) => {
                    const floorRooms = rooms.filter(room => room.floor === floor);
                    // Ensure the floor has at least 5 rooms
                    while (floorRooms.length < 5) {
                        floorRooms.push({
                            id: `temp-${floor}-${floorRooms.length + 1}`,
                            name: `Room ${floorRooms.length + 1}`,
                            floor: floor,
                            capacity: Math.floor(Math.random() * 10) + 1,
                            desks: [],
                            isOccupied: false
                        });
                    }
                    const occupiedRooms = floorRooms.filter(room => room.isOccupied).length;

                    return (
                        <div
                            key={floor}
                            className={`p-4 mb-6 border rounded-lg cursor-pointer ${expandedFloor === floor ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'}`}
                            onClick={() => openFloorPlan(floor)}
                        >
                            <h3 className="text-xl font-semibold text-center mb-2">Floor {floor}</h3>
                            <p className="text-center text-sm mb-4">Total Rooms: {floorRooms.length} |
                                Occupied: {occupiedRooms}</p>
                            <div className="flex flex-col items-center">
                                {floorRooms.map((room) => {
                                    const occupiedDesks = room.desks.filter(desk => desk.usage > 0).length;
                                    const totalDesks = room.desks.length;
                                    const occupancyPercentage = totalDesks > 0 ? (occupiedDesks / totalDesks) * 100 : 0;

                                    return (
                                        <div
                                            key={room.id}
                                            className="w-full p-4 mt-4 border rounded-lg bg-gray-50 hover:bg-gray-100 shadow-md"
                                            onClick={() => openRoom(room)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium">Room {room.name} ({room.capacity} people)</p>
                                                <div className="flex items-center">
                                                    <div className="w-32 h-2 bg-gray-300 rounded-full mr-2">
                                                        <div
                                                            className={`h-full rounded-full ${getProgressColor(occupancyPercentage)} transition-all duration-300`}
                                                            style={{width: `${occupancyPercentage}%`}}
                                                        />
                                                    </div>
                                                    <span
                                                        className="text-xs font-semibold text-gray-700">{occupancyPercentage.toFixed(2)}%</span>
                                                </div>
                                            </div>
                                            {room.imageUrl && <img src={room.imageUrl} alt={`Room ${room.name}`}
                                                                   className="w-full h-auto mt-2 rounded-lg"/>}
                                            <div className="flex flex-wrap justify-center mt-4 space-x-4">
                                                {room.desks.map((desk, index) => (
                                                    <div key={index}
                                                         className="p-4 border rounded-lg bg-white shadow-lg text-center w-32">
                                                        <p className="font-semibold">Desk {desk.id}</p>
                                                        <div className="relative w-full mt-2">
                                                            <div
                                                                className={`h-2 rounded-full ${getProgressColor(desk.usage)} transition-all duration-300`}
                                                                style={{width: `${desk.usage}%`}}/>
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={desk.usage}
                                                                onChange={(e) => handleDeskUsageChange(room.id, index, parseInt(e.target.value))}
                                                                className="absolute w-full top-0 h-2 opacity-0 cursor-pointer"
                                                            />
                                                            <span
                                                                className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                                                                {desk.usage}%
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-2">{desk.usage}%
                                                            Usage}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {expandedFloor && (
                <FloorPlanModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    floor={expandedFloor}
                    rooms={rooms.filter(room => room.floor === expandedFloor)}
                />
            )}

            {selectedRoom && (
                <div className="w-full max-w-4xl mt-6 p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-center mb-4">Room {selectedRoom.name}</h3>
                    <div className="flex flex-wrap justify-center space-x-4">
                        {selectedRoom.desks.map((desk, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg bg-gray-50 text-center w-32 shadow-lg hover:bg-gray-100"
                                onClick={() => alert(`Desk ${desk.id} selected`)}
                            >
                                <p className="font-semibold">Desk {desk.id}</p>
                                <div className="relative w-full mt-2">
                                    <div
                                        className={`h-2 rounded-full ${getProgressColor(desk.usage)} transition-all duration-300`}
                                        style={{width: `${desk.usage}%`}}/>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={desk.usage}
                                        onChange={(e) => handleDeskUsageChange(selectedRoom.id, index, parseInt(e.target.value))}
                                        className="absolute w-full top-0 h-2 opacity-0 cursor-pointer"
                                    />
                                    <span
                                        className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                                        {desk.usage}%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{desk.usage}% Usage}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FloorsAndRooms;
