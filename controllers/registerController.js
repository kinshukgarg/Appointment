const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, role, password: hashedPassword });
    res.status(201).json({ user });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already in use. Please use a different email.' });
    }
    res.status(500).json({ error: 'User registration failed' });
  }
};
