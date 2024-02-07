const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const streamRouter = require('./stream');

const setRouter = (app) => {
  app.use('/api/v1', router);
  router.use(`/stream`, streamRouter);
  router.use(`/admin`, adminRouter);
};

module.exports = { setRouter };
