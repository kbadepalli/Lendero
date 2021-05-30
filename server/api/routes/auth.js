const express = require('express');
const authCtrl = require('../controllers/auth');
const router = express.Router();
const validateAuth = require('../validators/auth');

router.post('/login', validateAuth.login, authCtrl.authenticate);
router.get('/auth', authCtrl.hasValidToken);
// router.get('/reset-password', userCtrl.getUser);

// router.post('/forgot-password', validateAuth.addUser, userCtrl.addUser);

module.exports = router;
