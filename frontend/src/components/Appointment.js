
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appointment() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setTeachers(response.data.users.filter(user => user.role === 'Teacher'));
      } catch (error) {
        console.error('Failed to fetch teachers', error);
      }
    };
    fetchTeachers();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const studentId = 1; // Assume the student is logged in and their ID is 1
      await axios.post('http://localhost:3000/api/appointments', {
        studentId, teacherId: selectedTeacher, date
      });
      // Redirect to dashboard or show success message
    } catch (error) {
      console.error('Failed to book appointment', error);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <label>Teacher</label>
          <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default Appointment;
