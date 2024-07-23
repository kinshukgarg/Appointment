const { Appointment } = require('../models');

exports.createAppointment = async (req, res) => {
  const { studentId, teacherId, date } = req.body;
  try {
    const appointment = await Appointment.create({ studentId, teacherId, date });
    res.json({ appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({ error: 'Appointment creation failed' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
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
      res.json({ appointment });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Error confirming appointment:', error);
    res.status(400).json({ error: 'Appointment confirmation failed' });
  }
};
