const sequelize = require('../config/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const seed = async () => {
  await sequelize.sync({ force: true });

  const hashedTeacherPassword = await bcrypt.hash('teacherpassword', 10);
  await User.create({
    name: 'Predefined Teacher',
    email: 'teacher@example.com',
    role: 'teacher',
    password: hashedTeacherPassword,
  });

  const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
  await User.create({
    name: 'Predefined Admin',
    email: 'admin@example.com',
    role: 'admin',
    password: hashedAdminPassword,
  });

  console.log('Seeding complete');
};

seed().then(() => process.exit());
