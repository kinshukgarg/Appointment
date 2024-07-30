// routes/appointment.js
const express = require('express');
const { createAppointment, getAppointments, getTeacherAppointments, confirmAppointment, rejectAppointment } = require('../controllers/appointmentController');
const isTeacher = require('../middlewares/isTeacher');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/', authenticate, createAppointment); // Create a new appointment
router.get('/', authenticate, getAppointments); // Get all appointments
router.get('/teacher', authenticate, isTeacher, getTeacherAppointments); // Get teacher's appointments
router.put('/:id/confirm', authenticate, isTeacher, confirmAppointment); // Confirm appointment
router.put('/:id/reject', authenticate, isTeacher, rejectAppointment); // Reject appointment

module.exports = router;
