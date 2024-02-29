'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingTypes = await queryInterface.sequelize.query(
      `SELECT type FROM "license_terms" GROUP BY type;`
    );

    const existingTypesArray = existingTypes[0].map(record => record.type);

    if (!existingTypesArray.includes('preview')) {
      await queryInterface.bulkInsert('license_terms', [
        {
          id: uuidv4(),
          title: 'Monthly Preview License',
          type: 'preview',
          license_type: 'monthly',
          license_terms: 'Monthly - 1000 views',
          amount: 0.00,
          currency: 'USD',
          copyright_notice: 'Copyright notice for preview license...',
          license: 'License details for preview...',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ], {});
    }

    if (!existingTypesArray.includes('licensed')) {
      await queryInterface.bulkInsert('license_terms', [
        {
          id: uuidv4(),
          title: 'Montly License',
          type: 'licensed',
          license_type: 'monthly',
          license_terms: 'Monthly - 1000 views',
          amount: 100.00,
          currency: 'USD',
          copyright_notice: 'Copyright notice for licensed license...',
          license: 'License details for licensed...',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('license_terms', null, {});
  },
};