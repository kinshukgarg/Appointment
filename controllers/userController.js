
const { User } = require('../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.role = role;
      await user.save();
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
};
