const { Appointment } = require('../models');

exports.createAppointment = async (req, res) => {
  const { studentId, teacherId, date } = req.body;
  try {
    const appointment = await Appointment.create({ studentId, teacherId, date });
    res.status(201).json({ appointment });
  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(400).json({ error: 'Appointment creation failed' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Fetching appointments error:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

exports.confirmAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      appointment.confirmed = true;
      await appointment.save();
      res.status(200).json({ appointment });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Appointment confirmation error:', error);
    res.status(400).json({ error: 'Appointment confirmation failed' });
  }
};

exports.rejectAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      appointment.confirmed = false;
      await appointment.save();
      res.status(200).json({ appointment });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Appointment rejection error:', error);
    res.status(400).json({ error: 'Appointment rejection failed' });
  }
};
