import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appointment() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/teachers');
        console.log('Teachers fetched:', response.data.teachers);
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error('Failed to fetch teachers', error);
      }
    };
    fetchTeachers();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    if (!selectedTeacher) {
      setError('Please select a teacher.');
      return;
    }
    setError('');
    setSuccess('');

    try {
      const studentId = 1; // Assume the student is logged in and their ID is 1
      await axios.post('http://localhost:8000/api/appointments', {
        studentId,
        teacherId: selectedTeacher,
        date
      });
      setSuccess('Appointment booked successfully');
    } catch (error) {
      setError('Failed to book appointment. Please check your details.');
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
            <option value="">Select a teacher</option>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default Appointment;
