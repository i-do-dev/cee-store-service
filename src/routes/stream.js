const express = require("express");
const streamRouter = express.Router();
const authenticate = require('../middleware/api/key-authenticate');
const authorize = require('../middleware/api/key-authorize');
const { StreamController } = require("../controllers/stream");

streamRouter.get("/token", authenticate, authorize(['cee-player-service']), StreamController.getToken);
module.exports = streamRouter;
