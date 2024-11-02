import React, { useState } from 'react';

function UserDetail() {
  // State for user information (replace with real data from your API)
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    jobTitle: 'Software Engineer',
    department: 'IT',
    upcomingReservations: [
      { id: 1, desk: 'Desk 101', date: 'Nov 15, 2024' }
    ],
    pastReservations: [
      { id: 2, desk: 'Desk 202', date: 'Oct 20, 2024' }
    ]
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/register-login";
    alert('User logged out');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-gray-900 shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="mt-2 bg-blue-500 text-white px-3 py-2 rounded">Change Password</button>
      </div>

      <div className="bg-gray-900 shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold">Upcoming Reservations</h2>
        <ul>
          {user.upcomingReservations.map(reservation => (
            <li key={reservation.id} className="border-b py-2">
              {reservation.desk} - Reserved on {reservation.date}
              <button className="ml-4 text-red-500">Cancel</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-900 shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold">Past Reservations</h2>
        <ul>
          {user.pastReservations.map(reservation => (
            <li key={reservation.id} className="border-b py-2">
              {reservation.desk} - Reserved on {reservation.date}
            </li>
          ))}
        </ul>
      </div>

      

      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}

export default UserDetail;
