
const express = require('express');
const { createAppointment, getAppointments, confirmAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAppointments);
router.post('/:id/confirm', confirmAppointment);

module.exports = router;
