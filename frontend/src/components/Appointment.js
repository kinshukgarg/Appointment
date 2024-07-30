import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/appointments/pending');
        if (response.data && response.data.appointments) {
          setAppointments(response.data.appointments);
        } else {
          setError('No appointments found');
        }
      } catch (error) {
        console.error('Failed to fetch appointments', error);
        setError('Failed to fetch appointments. Please try again later.');
      }
    };
    fetchAppointments();
  }, []);

  const handleApproval = async (appointmentId, status) => {
    try {
      await axios.put(`http://localhost:8000/api/appointments/${appointmentId}`, { status });
      setAppointments(appointments.filter(app => app.id !== appointmentId));
      setSuccess('Appointment updated successfully');
      setError('');
    } catch (error) {
      setError('Failed to update appointment. Please try again.');
      console.error('Failed to update appointment', error);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Manage Appointments</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.studentName} - {appointment.date} at {appointment.time}
            <button onClick={() => handleApproval(appointment.id, 'approved')}>Approve</button>
            <button onClick={() => handleApproval(appointment.id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageAppointments;
