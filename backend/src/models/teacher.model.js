const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  availability: [{
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
    isBooked: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Indexes
teacherSchema.index({ email: 1 }, { unique: true });
teacherSchema.index({ 'availability.date': 1, 'availability.startTime': 1 });

module.exports = mongoose.model('Teacher', teacherSchema); 