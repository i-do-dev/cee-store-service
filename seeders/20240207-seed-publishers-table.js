'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // query to select first record form publisher_service table
    const publisher = await queryInterface.sequelize.query('SELECT * FROM "publisher_service" LIMIT 1');
    // if there is no record in publisher_service table then insert one record
    if (publisher[0].length === 0) {
      return queryInterface.bulkInsert('publisher_service', [{
        id: uuidv4(),
        name: 'tony local test publisherService',
        host: 'http://localhost:9999',
        key: '123key',
        client_id: uuidv4(),
      }], {});
    }
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    const publisherServiceCount = await queryInterface.sequelize.models.PublisherService.count();
  
    if (publisherServiceCount > 1) {
      console.log('Skipping deletion of publisher_service table due to existing records.');
      return Promise.resolve(); // Skip the deletion
    }
  
    // Otherwise, proceed with bulk deletion
    return queryInterface.bulkDelete('publisher_service', null, {});
  }
};