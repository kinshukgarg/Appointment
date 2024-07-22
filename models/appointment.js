
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    teacherId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  return Appointment;
};
