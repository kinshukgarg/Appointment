import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentList = ({ token }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} {appointment.time} - Student: {appointment.Student.name} | Teacher: {appointment.Teacher.name} | Status: {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
