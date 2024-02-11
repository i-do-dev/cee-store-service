const express = require("express");
const ceeRouter = express.Router();
const {CeeListingController} = require('../controllers/cee-listing');

const authenticate = require('../middleware/api/key-authenticate');
const authorize = require('../middleware/api/key-authorize');

ceeRouter.post('/', 
    authenticate, 
    authorize(['cee-publisher-service']),
    CeeListingController.create
);

module.exports = ceeRouter;