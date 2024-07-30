const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, DataTypes);
const Appointment = require('./appointment')(sequelize, DataTypes);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Appointment = Appointment;


User.hasMany(Appointment, { foreignKey: 'studentId', as: 'StudentAppointments' });
User.hasMany(Appointment, { foreignKey: 'teacherId', as: 'TeacherAppointments' });
Appointment.belongsTo(User, { foreignKey: 'studentId', as: 'Student' });
Appointment.belongsTo(User, { foreignKey: 'teacherId', as: 'Teacher' });

module.exports = db;
