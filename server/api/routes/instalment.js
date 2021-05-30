var express = require('express');
var instalmentCtrl = require('../controllers/instalment');
var router = express.Router();
const instalmentValidator = require('../validators/instalment');

router.post('/instalments/:loan_id', instalmentCtrl.getInstalments);

router.post('/add-instalment', instalmentValidator.addInstalment, instalmentCtrl.addInstalment);

router.put(
  '/edit-instalment',
  instalmentValidator.updateInstalment,
  instalmentCtrl.updateInstalment
);

module.exports = router;
