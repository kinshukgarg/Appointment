const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const Teacher = require('../models/teacher.model');
const Appointment = require('../models/appointment.model');

// Validation middleware
const validateTeacherId = [
  param('id').isMongoId().withMessage('Invalid teacher ID')
];

const validateAvailability = [
  body('date').isISO8601().withMessage('Invalid date format'),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid start time format'),
  body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid end time format')
];

// Get all teachers
router.get('/', async (req, res, next) => {
  try {
    const teachers = await Teacher.find().select('-__v');
    res.json(teachers);
  } catch (error) {
    next(error);
  }
});

// Get teacher by ID
router.get('/:id', validateTeacherId, async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select('-__v');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    next(error);
  }
});

// Add teacher availability
router.post('/:id/availability', [...validateTeacherId, ...validateAvailability], async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check for time slot conflicts
    const hasConflict = teacher.availability.some(slot => 
      slot.date.getTime() === new Date(req.body.date).getTime() &&
      (
        (req.body.startTime >= slot.startTime && req.body.startTime < slot.endTime) ||
        (req.body.endTime > slot.startTime && req.body.endTime <= slot.endTime) ||
        (req.body.startTime <= slot.startTime && req.body.endTime >= slot.endTime)
      )
    );

    if (hasConflict) {
      return res.status(400).json({ message: 'Time slot conflicts with existing availability' });
    }

    teacher.availability.push(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    next(error);
  }
});

// Update teacher availability
router.put('/:id/availability/:availabilityId', [...validateTeacherId, ...validateAvailability], async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const availability = teacher.availability.id(req.params.availabilityId);
    if (!availability) {
      return res.status(404).json({ message: 'Availability slot not found' });
    }

    // Check if the slot is booked
    if (availability.isBooked) {
      return res.status(400).json({ message: 'Cannot modify a booked time slot' });
    }

    // Check for time slot conflicts
    const hasConflict = teacher.availability.some(slot => 
      slot._id.toString() !== req.params.availabilityId &&
      slot.date.getTime() === new Date(req.body.date).getTime() &&
      (
        (req.body.startTime >= slot.startTime && req.body.startTime < slot.endTime) ||
        (req.body.endTime > slot.startTime && req.body.endTime <= slot.endTime) ||
        (req.body.startTime <= slot.startTime && req.body.endTime >= slot.endTime)
      )
    );

    if (hasConflict) {
      return res.status(400).json({ message: 'Time slot conflicts with existing availability' });
    }

    Object.assign(availability, req.body);
    await teacher.save();
    res.json(teacher);
  } catch (error) {
    next(error);
  }
});

// Delete teacher availability
router.delete('/:id/availability/:availabilityId', validateTeacherId, async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const availability = teacher.availability.id(req.params.availabilityId);
    if (!availability) {
      return res.status(404).json({ message: 'Availability slot not found' });
    }

    // Check if the slot is booked
    if (availability.isBooked) {
      return res.status(400).json({ message: 'Cannot delete a booked time slot' });
    }

    availability.remove();
    await teacher.save();
    res.json({ message: 'Availability slot deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 