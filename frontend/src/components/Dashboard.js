// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/appointments/teacher', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      }
    };
    fetchAppointments();
  }, []);

  const confirmAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/appointments/${id}/confirm`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAppointments(appointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'accepted' } : appointment
      ));
    } catch (error) {
      console.error('Failed to confirm appointment', error);
    }
  };

  const rejectAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/appointments/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAppointments(appointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'rejected' } : appointment
      ));
    } catch (error) {
      console.error('Failed to reject appointment', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id} className="appointment-item">
            <span>{appointment.date} with {appointment.Student.name}</span>
            <span>Status: {appointment.status}</span>
            {appointment.status === 'pending' && (
              <>
                <button onClick={() => confirmAppointment(appointment.id)}>Accept</button>
                <button onClick={() => rejectAppointment(appointment.id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
