import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { format, parseISO } from 'date-fns';
import axios from 'axios';

const ManageAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date(),
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get('/api/teachers/availability');
      setAvailability(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleOpenDialog = (slot = null) => {
    if (slot) {
      setSelectedSlot(slot);
      setFormData({
        date: parseISO(slot.date),
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    } else {
      setSelectedSlot(null);
      setFormData({
        date: new Date(),
        startTime: '',
        endTime: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSlot(null);
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
    try {
      if (selectedSlot) {
        await axios.put(`/api/teachers/availability/${selectedSlot._id}`, formData);
      } else {
        await axios.post('/api/teachers/availability', formData);
      }
      fetchAvailability();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/teachers/availability/${id}`);
      fetchAvailability();
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manage Availability
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
          sx={{ mb: 3 }}
        >
          Add New Time Slot
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availability.map((slot) => (
                <TableRow key={slot._id}>
                  <TableCell>{format(parseISO(slot.date), 'PPP')}</TableCell>
                  <TableCell>{slot.startTime}</TableCell>
                  <TableCell>{slot.endTime}</TableCell>
                  <TableCell>{slot.isBooked ? 'Booked' : 'Available'}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDialog(slot)}
                      disabled={slot.isBooked}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(slot._id)}
                      disabled={slot.isBooked}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedSlot ? 'Edit Time Slot' : 'Add New Time Slot'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
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
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedSlot ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ManageAvailability; 