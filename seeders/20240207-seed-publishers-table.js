'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // query to select first record form PublisherServices table
    const publisher = await queryInterface.sequelize.query('SELECT * FROM "PublisherServices" LIMIT 1');
    // if there is no record in PublisherServices table then insert one record
    if (publisher[0].length === 0) {
      return queryInterface.bulkInsert('PublisherServices', [{
        id: uuidv4(),
        name: 'tony local test publisherService',
        host: 'http://localhost:9999',
        key: '123key',
        clientId: uuidv4(),
      }], {});
    }
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    const publisherServiceCount = await queryInterface.sequelize.models.PublisherService.count();
  
    if (publisherServiceCount > 1) {
      console.log('Skipping deletion of PublisherServices table due to existing records.');
      return Promise.resolve(); // Skip the deletion
    }
  
    // Otherwise, proceed with bulk deletion
    return queryInterface.bulkDelete('PublisherServices', null, {});
  }
};