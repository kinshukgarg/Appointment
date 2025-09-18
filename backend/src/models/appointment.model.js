const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher ID is required']
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: [true, 'Reason for appointment is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Indexes
appointmentSchema.index({ teacherId: 1, date: 1 });
appointmentSchema.index({ studentId: 1, date: 1 });
appointmentSchema.index({ status: 1 });

// Virtual for checking if appointment is in the past
appointmentSchema.virtual('isPast').get(function() {
  const now = new Date();
  const appointmentDateTime = new Date(this.date);
  const [hours, minutes] = this.startTime.split(':');
  appointmentDateTime.setHours(hours, minutes);
  return appointmentDateTime < now;
});

module.exports = mongoose.model('Appointment', appointmentSchema); 