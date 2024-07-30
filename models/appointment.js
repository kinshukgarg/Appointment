const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Appointment = sequelize.define('Appointment', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
});

Appointment.belongsTo(User, { as: 'Student', foreignKey: 'studentId' });
Appointment.belongsTo(User, { as: 'Teacher', foreignKey: 'teacherId' });

module.exports = Appointment;
