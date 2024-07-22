
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments');
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      }
    };
    fetchAppointments();
  }, []);

  const confirmAppointment = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/appointments/${id}/confirm`);
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, confirmed: true } : appointment
      ));
    } catch (error) {
      console.error('Failed to confirm appointment', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.date} with {appointment.teacherId} - Confirmed: {appointment.confirmed.toString()}
            {appointment.confirmed ? null : <button onClick={() => confirmAppointment(appointment.id)}>Confirm</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
