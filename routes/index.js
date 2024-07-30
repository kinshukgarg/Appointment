const express = require('express');
const { register, login, getTeachers } = require('../controllers/userController');
const { createAppointment, getAppointments, confirmAppointment, rejectAppointment } = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/teachers', auth, getTeachers);

router.post('/appointments', auth, createAppointment);
router.get('/appointments', auth, getAppointments);
router.put('/appointments/:id/confirm', auth, confirmAppointment);
router.put('/appointments/:id/reject', auth, rejectAppointment);

router.get('/admin/appointments', auth, isAdmin, getAppointments);
router.put('/admin/appointments/:id/confirm', auth, isAdmin, confirmAppointment);
router.put('/admin/appointments/:id/reject', auth, isAdmin, rejectAppointment);

module.exports = router;
