const express = require('express');
const { register, login } = require('../controllers/authController');
const authenticate = require('../Middlewares/authenticate');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example of a protected route
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
