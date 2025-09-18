import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const BookAppointment = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Fetch teachers
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    // Fetch available slots when teacher and date are selected
    const fetchAvailableSlots = async () => {
      if (selectedTeacher && selectedDate) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/appointments/availability/${selectedTeacher}`
          );
          setAvailableSlots(response.data);
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedTeacher, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedSlotData = availableSlots.find(slot => slot._id === selectedSlot);
      await axios.post('http://localhost:5000/api/students/1/appointments', {
        teacherId: selectedTeacher,
        date: selectedDate,
        startTime: selectedSlotData.startTime,
        endTime: selectedSlotData.endTime,
        reason: reason
      });
      // Reset form
      setSelectedTeacher('');
      setSelectedDate(null);
      setSelectedSlot('');
      setReason('');
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Book Appointment
        </Typography>
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Teacher</InputLabel>
                  <Select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    required
                  >
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher._id} value={teacher._id}>
                        {teacher.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              {availableSlots.length > 0 && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Available Time Slots</InputLabel>
                    <Select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      required
                    >
                      {availableSlots.map((slot) => (
                        <MenuItem key={slot._id} value={slot._id}>
                          {`${slot.startTime} - ${slot.endTime}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason for Appointment"
                  multiline
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!selectedTeacher || !selectedDate || !selectedSlot || !reason}
                >
                  Book Appointment
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default BookAppointment; 