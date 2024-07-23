import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import LandingPage from './components/Landingpage';
import Dashboard from './components/Dashboard';
import Appointment from './components/Appointment';
import UserManagement from './components/UserManagement';


const App = () => {
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        setUserToken(null);
        localStorage.removeItem('token');
        alert('Logged out successfully.');
    };

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                {!userToken ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/appointments">Book Appointment</Link>
                        <Link to="/user-management">User Management</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>

            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/register" component={Register} />
                <Route path="/login">
                    <Login setUser={setUserToken} />
                </Route>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/appointments" component={Appointment} />
                <Route path="/user-management" component={UserManagement} />
            </Switch>
        </Router>
    );
};

export default App;
