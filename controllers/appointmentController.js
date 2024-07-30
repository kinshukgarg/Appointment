const { Appointment, User } = require('../models');

exports.createAppointment = async (req, res) => {
  const { studentId, teacherId, date, time } = req.body;
  try {
    const existingAppointment = await Appointment.findOne({
      where: {
        teacherId,
        date,
        time,
        status: 'accepted'
      }
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Teacher is already booked for this time slot' });
    }

    const appointment = await Appointment.create({ studentId, teacherId, date, time, status: 'pending' });
    res.status(201).json({ appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Appointment creation failed' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: User, as: 'Student', attributes: ['name'] },
        { model: User, as: 'Teacher', attributes: ['name'] }
      ]
    });
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

exports.confirmAppointment = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (role !== 'admin' && appointment.teacherId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const existingAppointment = await Appointment.findOne({
      where: {
        teacherId: appointment.teacherId,
        date: appointment.date,
        time: appointment.time,
        status: 'accepted'
      }
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Teacher is already booked for this time slot' });
    }

    appointment.status = 'accepted';
    await appointment.save();
    res.status(200).json({ appointment });
  } catch (error) {
    console.error('Error confirming appointment:', error);
    res.status(500).json({ error: 'Appointment confirmation failed' });
  }
};

exports.rejectAppointment = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (role !== 'admin' && appointment.teacherId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    appointment.status = 'rejected';
    await appointment.save();
    res.status(200).json({ appointment });
  } catch (error) {
    console.error('Error rejecting appointment:', error);
    res.status(500).json({ error: 'Appointment rejection failed' });
  }
};
