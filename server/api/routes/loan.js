const express = require('express');
const loanCtrl = require('../controllers/loan');
const router = express.Router();
const validateLoan = require('../validators/loan');

router.get('/loans', loanCtrl.getLoans);

router.get('/loan/:id', loanCtrl.getLoan);

router.post('/add-loan', validateLoan.addLoan, loanCtrl.addLoan);

router.put('/edit-loan', validateLoan.updateLoan, loanCtrl.updateLoan);

router.post('/delete-loan', validateLoan.deleteLoan, loanCtrl.deleteLoan);

module.exports = router;
