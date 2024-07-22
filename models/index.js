
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Appointment = require('./appointment')(sequelize, Sequelize);

User.hasMany(Appointment, { foreignKey: 'studentId' });
User.hasMany(Appointment, { foreignKey: 'teacherId' });
Appointment.belongsTo(User, { as: 'Student', foreignKey: 'studentId' });
Appointment.belongsTo(User, { as: 'Teacher', foreignKey: 'teacherId' });

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = { User, Appointment };
