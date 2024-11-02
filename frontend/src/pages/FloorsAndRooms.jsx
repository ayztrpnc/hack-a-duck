import React, { useState } from 'react';

function FloorsAndRooms() {
    const [expandedFloor, setExpandedFloor] = useState(null);

    const toggleFloor = (floor) => {
        setExpandedFloor(expandedFloor === floor ? null : floor);
    };

    return (
        <div style={styles.container}>
            <h2>Building Map</h2>
            <div style={styles.mapContainer}>
                {/* Floor 1 */}
                <div style={styles.floor}>
                    <h3 onClick={() => toggleFloor(1)} style={styles.floorTitle}>
                        Floor 1
                    </h3>
                    {expandedFloor === 1 && (
                        <div style={styles.roomGrid}>
                            <div style={styles.room}>Room 1</div>
                            <div style={styles.room}>Room 2</div>
                            <div style={styles.room}>Room 3</div>
                            <div style={styles.room}>Room 4</div>
                        </div>
                    )}
                </div>

                {/* Floor 2 */}
                <div style={styles.floor}>
                    <h3 onClick={() => toggleFloor(2)} style={styles.floorTitle}>
                        Floor 2
                    </h3>
                    {expandedFloor === 2 && (
                        <div style={styles.roomGrid}>
                            <div style={styles.room}>Room 1</div>
                            <div style={styles.room}>Room 2</div>
                            <div style={styles.room}>Room 3</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#f0f0f0',
    },
    mapContainer: {
        width: '90%',
        maxWidth: '800px',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    floor: {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#e0f7fa',
    },
    floorTitle: {
        cursor: 'pointer',
        fontSize: '1.4em',
        margin: '0 0 10px 0',
    },
    roomGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
    },
    room: {
        padding: '10px',
        border: '1px solid #00796b',
        borderRadius: '4px',
        backgroundColor: '#b2dfdb',
        textAlign: 'center',
        fontWeight: 'bold',
    },
};

export default FloorsAndRooms;
