const express = require('express');
const { createAppointment, getAppointments, confirmAppointment, rejectAppointment } = require('../controllers/appointmentController');
const authenticate = require('../middlewares/authenticate');
const isTeacher = require('../middlewares/isTeacher');
const router = express.Router();

router.post('/', authenticate, createAppointment);
router.get('/', authenticate, getAppointments);
router.put('/:id/confirm', authenticate, isTeacher, confirmAppointment);
router.put('/:id/reject', authenticate, isTeacher, rejectAppointment);

module.exports = router;
