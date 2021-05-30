var express = require('express');
var roleCtrl = require('../controllers/role');
var router = express.Router();
const roleValidator = require('../validators/role');
router.get('/roles', roleCtrl.getRoles);

router.get('/role/:id', roleValidator.getRole, roleCtrl.getRole);

router.post('/add-role', roleValidator.addRole, roleCtrl.addRole);

router.put('/edit-role', roleValidator.updateRole, roleCtrl.updateRole);

router.post('/delete-role', roleCtrl.deleteRole);

module.exports = router;
