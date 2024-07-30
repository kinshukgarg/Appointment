const sequelize = require('../config/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const seed = async () => {
  await sequelize.sync({ force: true });

  const hashedTeacherPassword = await bcrypt.hash('teacherpassword', 10);
  await User.create({
    name: 'Predefined Teacher',
    email: 'teacher@example.com',
    phone: '1234567890',
    role: 'Teacher',
    password: hashedTeacherPassword,
  });

  const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
  await User.create({
    name: 'Predefined Admin',
    email: 'admin@example.com',
    phone: '0987654321',
    role: 'Institute',
    password: hashedAdminPassword,
  });

  console.log('Seeding complete');
};

seed().then(() => process.exit());
