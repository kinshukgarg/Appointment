import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/appointments');
        console.log('Fetched appointments:', response.data.appointments); // Debug log
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      }
    };
    fetchAppointments();
  }, []);

  const confirmAppointment = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/appointments/${id}/confirm`);
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, confirmed: true } : appointment
      ));
    } catch (error) {
      console.error('Failed to confirm appointment', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id} className="appointment-item">
            <span>{appointment.date} with {appointment.teacherId}</span>
            <span>Confirmed: {appointment.confirmed.toString()}</span>
            {!appointment.confirmed && (
              <button onClick={() => confirmAppointment(appointment.id)}>Confirm</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
