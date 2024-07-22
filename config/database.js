
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('appointment_system', 'root', 'Ilovecr7@', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
