const express = require('express');
const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example of a protected route
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
