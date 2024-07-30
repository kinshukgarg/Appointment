
module.exports = (sequelize, DataTypes) => {
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
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
    },
  });

  return Appointment;
};
