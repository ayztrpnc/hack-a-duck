import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 w-full fixed top-0 z-10">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-xl font-semibold">
                    <Link to="/">Desk Booking App</Link>
                </h1>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-blue-200">Home</Link>
                    <Link to="/register-login" className="text-white hover:text-blue-200">Login /Register</Link>
                    <Link to="/profile" className="text-white hover:text-blue-200">Profile</Link>
                    <Link to="/room-selection" className="text-white hover:text-blue-200">Room Selection</Link>
                    <Link to="/floors-and-rooms" className="text-white hover:text-blue-200">Floors & Rooms</Link>
                    <Link to="/calendar" className="text-white hover:text-blue-200">Calendar</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
