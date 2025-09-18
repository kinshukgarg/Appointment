import axios from 'axios';

const API_URL = '/api/appointments';

const getAllAppointments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAppointmentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createAppointment = async (appointmentData) => {
  const response = await axios.post(API_URL, appointmentData);
  return response.data;
};

const updateAppointment = async (id, appointmentData) => {
  const response = await axios.put(`${API_URL}/${id}`, appointmentData);
  return response.data;
};

const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const getTeacherAvailability = async (teacherId) => {
  const response = await axios.get(`${API_URL}/availability/${teacherId}`);
  return response.data;
};

const getStudentAppointments = async (studentId) => {
  const response = await axios.get(`${API_URL}/student/${studentId}`);
  return response.data;
};

const getTeacherAppointments = async (teacherId) => {
  const response = await axios.get(`${API_URL}/teacher/${teacherId}`);
  return response.data;
};

const updateAppointmentStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}/status`, { status });
  return response.data;
};

const getAppointmentsByDateRange = async (startDate, endDate) => {
  const response = await axios.get(
    `${API_URL}/date-range/${startDate}/${endDate}`
  );
  return response.data;
};

const appointmentService = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getTeacherAvailability,
  getStudentAppointments,
  getTeacherAppointments,
  updateAppointmentStatus,
  getAppointmentsByDateRange,
};

export default appointmentService;