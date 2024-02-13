const express = require("express");
const publisherServiceRouter = express.Router();
const {PublisherServiceController} = require('../controllers/publisher-service');

publisherServiceRouter.get("/", PublisherServiceController.list);
publisherServiceRouter.post("/", PublisherServiceController.create);

module.exports = publisherServiceRouter;