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
    type: DataTypes.DATE,
    allowNull: false,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

Appointment.belongsTo(User, { as: 'Student', foreignKey: 'studentId' });
Appointment.belongsTo(User, { as: 'Teacher', foreignKey: 'teacherId' });

module.exports = Appointment;
