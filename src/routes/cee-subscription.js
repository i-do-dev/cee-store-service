const express = require("express");
const ceeRouter = express.Router();
const {CeeSubscriptionController} = require('../controllers/cee-subscription');

const authenticate = require('../middleware/api/key-authenticate');
const authorize = require('../middleware/api/key-authorize');

ceeRouter.get('/manifest', 
    authenticate, 
    authorize(['cee-player-service']),
    CeeSubscriptionController.manifest
);

module.exports = ceeRouter;