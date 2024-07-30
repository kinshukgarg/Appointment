import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { createAppointment, getTeachers } from '../services/api';
import MenuItem from '@mui/material/MenuItem';

const AppointmentDialog = ({ open, handleClose, token }) => {
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers(token);
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    if (token) {
      fetchTeachers();
    }
  }, [token]);

  const handleSubmit = async () => {
    try {
      await createAppointment({ studentId, teacherId, date, time }, token);
      handleClose();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Appointment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Student ID"
          fullWidth
          variant="standard"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <TextField
          select
          margin="dense"
          label="Teacher"
          fullWidth
          variant="standard"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Date"
          type="date"
          fullWidth
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          label="Time"
          type="time"
          fullWidth
          variant="standard"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDialog;
