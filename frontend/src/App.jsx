import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import RegisterLogin from './pages/RegisterLogin';
import Profile from './pages/Profile';
import DeskSelection from './pages/DeskSelection';
import FloorsAndRooms from './pages/FloorsAndRooms';
import Calendar from './pages/Calendar';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register2 from './components/Register2';

function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('/api/test') // Proxy will redirect this to http://localhost:3000/api/test
  //     .then(response => response.json())
  //     .then(data => setMessage(data.message))
  //     .catch(error => console.error('Error:', error));
  // }, []);

  return (
    <Router>
      <div className="container mx-auto p-4 pt-24 flex flex-col items-center">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Desk Booking App</h1>
        <p className="mb-4">Message from Backend: {message}</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/register-login" element={<RegisterLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/room-selection" element={<DeskSelection />} />
          <Route path="/floors-and-rooms" element={<FloorsAndRooms />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
