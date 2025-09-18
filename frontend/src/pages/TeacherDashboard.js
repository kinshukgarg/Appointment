import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teacher's appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
        status
      });
      // Refresh appointments after update
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Teacher Dashboard
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/manage-availability')}
          >
            Manage Availability
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom>
          Your Appointments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.studentId?.name}</TableCell>
                  <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{`${appointment.startTime} - ${appointment.endTime}`}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>
                    {appointment.status === 'pending' && (
                      <>
                        <Button
                          color="success"
                          onClick={() => handleUpdateStatus(appointment._id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleUpdateStatus(appointment._id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TeacherDashboard; 