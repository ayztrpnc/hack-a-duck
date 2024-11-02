import React from 'react';
import Modal from 'react-modal';

const FloorPlanModal = ({ isOpen, onRequestClose, floor, rooms }) => {
    console.log('FloorPlanModal rooms:', rooms); // Log the rooms data

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Floor {floor} Plan</h2>
            {rooms.map(room => (
                <div key={room.id}>
                    <p>Room {room.name}</p>
                    {/* Ensure the image URL is correct */}
                    {room.imageUrl && <img src={room.imageUrl} alt={`Room ${room.name}`} style={styles.image} />}
                </div>
            ))}
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

const styles = {
    image: {
        width: '100%',
        height: 'auto',
    },
};

export default FloorPlanModal;