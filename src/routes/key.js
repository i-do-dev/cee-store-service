const express = require("express");
const keysRouter = express.Router();
const {KeyController} = require('../controllers/key');

keysRouter.get("/", KeyController.list); 

module.exports = keysRouter;