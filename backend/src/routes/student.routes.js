const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const Student = require('../models/student.model');
const Appointment = require('../models/appointment.model');
const Teacher = require('../models/teacher.model');

// Validation middleware
const validateStudentId = [
  param('id').isMongoId().withMessage('Invalid student ID')
];

const validateAppointment = [
  body('teacherId').isMongoId().withMessage('Invalid teacher ID'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid start time format'),
  body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid end time format'),
  body('reason').trim().notEmpty().withMessage('Reason is required')
];

// Get all students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find().select('-__v');
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// Get student by ID
router.get('/:id', validateStudentId, async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).select('-__v');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Get student's appointments
router.get('/:id/appointments', validateStudentId, async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('appointments.teacherId', 'name email department')
      .select('-__v');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.appointments);
  } catch (error) {
    next(error);
  }
});

// Book an appointment
router.post('/:id/appointments', [...validateStudentId, ...validateAppointment], async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the time slot is available
    const teacher = await Teacher.findById(req.body.teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const availableSlot = teacher.availability.find(slot => 
      slot.date.getTime() === new Date(req.body.date).getTime() &&
      slot.startTime === req.body.startTime &&
      slot.endTime === req.body.endTime &&
      !slot.isBooked
    );

    if (!availableSlot) {
      return res.status(400).json({ message: 'Selected time slot is not available' });
    }

    // Create appointment
    const appointment = new Appointment({
      teacherId: req.body.teacherId,
      studentId: student._id,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      reason: req.body.reason
    });

    await appointment.save();

    // Add appointment to student's appointments array
    student.appointments.push({
      teacherId: appointment.teacherId,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status
    });

    // Mark the time slot as booked
    availableSlot.isBooked = true;
    await teacher.save();
    await student.save();

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
});

// Cancel an appointment
router.put('/:id/appointments/:appointmentId/cancel', validateStudentId, async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.studentId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment is already cancelled' });
    }

    // Update appointment status
    appointment.status = 'cancelled';
    await appointment.save();

    // Update student's appointment status
    const studentAppointment = student.appointments.id(req.params.appointmentId);
    if (studentAppointment) {
      studentAppointment.status = 'cancelled';
      await student.save();
    }

    // Update teacher's availability
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

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 