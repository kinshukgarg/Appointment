const express = require('express');
const router = express.Router();
const { param, body } = require('express-validator');
const Appointment = require('../models/appointment.model');
const Teacher = require('../models/teacher.model');

// Validation middleware
const validateAppointmentId = [
  param('id').isMongoId().withMessage('Invalid appointment ID')
];

const validateStatus = [
  body('status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('Invalid status')
];

// Get all appointments
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('teacherId', 'name email department')
      .populate('studentId', 'name email studentId')
      .select('-__v');
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

// Get appointment by ID
router.get('/:id', validateAppointmentId, async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('teacherId', 'name email department')
      .populate('studentId', 'name email studentId')
      .select('-__v');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    next(error);
  }
});

// Update appointment status
router.put('/:id/status', [...validateAppointmentId, ...validateStatus], async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update appointment status
    appointment.status = req.body.status;
    await appointment.save();

    // Update teacher's availability if appointment is cancelled
    if (req.body.status === 'cancelled') {
      const teacher = await Teacher.findById(appointment.teacherId);
      if (teacher) {
        const availability = teacher.availability.find(slot => 
          slot.date.getTime() === appointment.date.getTime() &&
          slot.startTime === appointment.startTime &&
          slot.endTime === appointment.endTime
        );
        if (availability) {
          availability.isBooked = false;
          await teacher.save();
        }
      }
    }

    res.json(appointment);
  } catch (error) {
    next(error);
  }
});

// Get teacher's available time slots
router.get('/availability/:teacherId', async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const availableSlots = teacher.availability.filter(slot => !slot.isBooked);
    res.json(availableSlots);
  } catch (error) {
    next(error);
  }
});

// Get appointments by date range
router.get('/date-range/:startDate/:endDate', async (req, res, next) => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    const appointments = await Appointment.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .populate('teacherId', 'name email department')
    .populate('studentId', 'name email studentId')
    .select('-__v');

    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 