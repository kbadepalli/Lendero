const express = require('express');
const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/auth');
const router = express.Router();
const validateUser = require('../validators/user');

router.get('/users', userCtrl.getUsers);

router.get('/user/:id', userCtrl.getUser);

router.post('/add-user', validateUser.addUser, userCtrl.addUser);

router.put('/edit-user', validateUser.updateUser, userCtrl.updateUser);

router.post('/delete-user', validateUser.deleteUser, userCtrl.deleteUser);

module.exports = router;
