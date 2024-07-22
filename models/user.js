
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Teacher', 'Student', 'Institute'), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  return User;
};
