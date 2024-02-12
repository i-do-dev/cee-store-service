'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Publishers', [{
        name: 'tony local test publisher',
        url: 'http://localhost:9999',
        key: '123key',
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    const publisherCount = await queryInterface.sequelize.models.Publisher.count();
  
    if (publisherCount > 1) {
      console.log('Skipping deletion of Publishers table due to existing records.');
      return Promise.resolve(); // Skip the deletion
    }
  
    // Otherwise, proceed with bulk deletion
    return queryInterface.bulkDelete('Publishers', null, {});
  }
};