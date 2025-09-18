import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';

const AppointmentForm = ({ open, onClose, onSuccess, teacherId }) => {
  const [formData, setFormData] = useState({
    teacherId: teacherId || '',
    date: new Date(),
    startTime: '',
    endTime: '',
    reason: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!teacherId) {
      fetchTeachers();
    }
  }, [teacherId]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/appointments', formData);
      onSuccess(response.data);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {!teacherId && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Teacher</InputLabel>
                  <Select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleInputChange}
                    required
                  >
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher._id} value={teacher._id}>
                        {teacher.name} - {teacher.department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <DateTimePicker
                label="Date and Time"
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start Time"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Time"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for Appointment"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;