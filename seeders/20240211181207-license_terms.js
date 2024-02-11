'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingTypes = await queryInterface.sequelize.query(
      `SELECT type FROM "LicenseTerms" GROUP BY type;`
    );

    const existingTypesArray = existingTypes[0].map(record => record.type);

    if (!existingTypesArray.includes('preview')) {
      await queryInterface.bulkInsert('LicenseTerms', [
        {
          id: uuidv4(),
          title: 'Monthly Preview License',
          type: 'preview',
          licenseType: 'monthly',
          licenseTerms: 'Monthly - 1000 views',
          amount: 0.00,
          currency: 'USD',
          copyrightNotice: 'Copyright notice for preview license...',
          license: 'License details for preview...',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
    }

    if (!existingTypesArray.includes('licensed')) {
      await queryInterface.bulkInsert('LicenseTerms', [
        {
          id: uuidv4(),
          title: 'montly License',
          type: 'licensed',
          licenseType: 'monthly',
          licenseTerms: 'Monthly - 1000 views',
          amount: 100.00,
          currency: 'USD',
          copyrightNotice: 'Copyright notice for licensed license...',
          license: 'License details for licensed...',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LicenseTerms', null, {});
  },
};