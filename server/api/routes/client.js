const express = require('express');
const clientCtrl = require('../controllers/client');
const router = express.Router();
const validateClient = require('../validators/client');

router.get('/clients', clientCtrl.getClients);

router.get('/client/:id', clientCtrl.getClient);

router.post('/add-client', validateClient.addClient, clientCtrl.addClient);

router.put('/edit-client', validateClient.updateClient, clientCtrl.updateClient);

router.post('/delete-client', validateClient.deleteClient, clientCtrl.deleteClient);

module.exports = router;
