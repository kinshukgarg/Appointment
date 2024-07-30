
const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, getTeachers } = require('../controllers/userController');
const isAdmin = require('../Middlewares/isAdmin');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.get('/', authenticate, isAdmin, getUsers);
router.post('/', authenticate, isAdmin, createUser);
router.put('/:id', authenticate, isAdmin, updateUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);
router.get('/teachers', authenticate, isAdmin, getTeachers);

module.exports = router;
