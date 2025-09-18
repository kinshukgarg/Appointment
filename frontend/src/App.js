import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import BookAppointment from './pages/BookAppointment';
import ManageAvailability from './pages/ManageAvailability';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const PrivateRoute = ({ children, roles }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route
                path="student"
                element={
                  <PrivateRoute roles={['student']}>
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="teacher"
                element={
                  <PrivateRoute roles={['teacher']}>
                    <TeacherDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="book-appointment"
                element={
                  <PrivateRoute roles={['student']}>
                    <BookAppointment />
                  </PrivateRoute>
                }
              />
              <Route
                path="manage-availability"
                element={
                  <PrivateRoute roles={['teacher']}>
                    <ManageAvailability />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 