const express = require('express');
const { createAppointment, getAppointments, confirmAppointment, rejectAppointment } = require('../controllers/appointmentController');
const isTeacher = require('../middlewares/isTeacher');
const router = express.Router();


router.post('/', createAppointment); // Create a new appointment
router.get('/', getAppointments); // Get all appointments


router.put('/:id/confirm', isTeacher, confirmAppointment);
router.put('/:id/reject', isTeacher, rejectAppointment); 

module.exports = router;
