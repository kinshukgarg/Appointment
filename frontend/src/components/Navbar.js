import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">Appointment Booking System</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="/register" className="navbar-link">Register</Link></li>
                <li><Link to="/login" className="navbar-link">Login</Link></li>
                <li><Link to="/appointments" className="navbar-link">Appointments</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
