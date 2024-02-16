const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const streamRouter = require('./stream');
const pagesRouter = require('./pages');
const keyRouter = require('./key');
const ceeListingRouter = require('./cee-listing');
const publisherServiceRouter = require('./publisher-service');
const ceeSubscriptionRouter = require('./cee-subscription');

const setRouter = (app) => {
  app.use('/api/v1', router);
  router.use(`/stream`, streamRouter);
  router.use(`/admin`, adminRouter);

  router.use(`/c2e-listings`, ceeListingRouter);

  router.use(`/keys`, keyRouter);
  router.use(`/publisher-services`, publisherServiceRouter);
  router.use(`/c2e-subscriptions`, ceeSubscriptionRouter);
  
  // page routes
  app.use('/', router);
  router.use(`/`, pagesRouter);
};

module.exports = { setRouter };
