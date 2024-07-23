import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './LandingPage.css'; 

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <header className="landing-header">
                <h1>Welcome to the Appointment Booking System</h1>
                <p>Your one-stop solution for booking and managing appointments with teachers.</p>
                <Link to="/register" className="btn">Get Started</Link>
            </header>
            <section className="features">
                <h2>Features</h2>
                <ul>
                    <li>User authentication: Register, login, and manage your account securely.</li>
                    <li>View and manage appointments easily.</li>
                    <li>Teachers can confirm appointments promptly.</li>
                    <li>Simple and user-friendly interface.</li>
                </ul>
            </section>
            <footer className="landing-footer">
                <p>&copy; {new Date().getFullYear()} Appointment Booking System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
