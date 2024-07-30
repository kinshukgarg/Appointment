const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, getTeachers } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/teachers', getTeachers);

module.exports = router;
