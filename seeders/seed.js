const sequelize = require('../config/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const seed = async () => {
  await sequelize.sync({ force: true });

  const hashedTeacherPassword = await bcrypt.hash('teacherpassword', 10);
  await User.create({
    name: 'Predefined Teacher',
    email: 'Jaishreeram@gmail.com',
    role: 'teacher',
    password: hashedTeacherPassword,
  });

  const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
  await User.create({
    name: 'Predefined Admin',
    email: 'jaishreeram@gmail.com',
    role: 'admin',
    password: hashedAdminPassword,
  });

  console.log('Seeding complete');
};

seed().then(() => process.exit());
