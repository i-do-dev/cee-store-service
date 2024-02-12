'use strict';
const {generateKey} = require('../src/utils/key')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add the licenseKey column without a default value
    await queryInterface.addColumn('CeeSubscriptions', 'licenseKey', {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null
      unique: true
    });

    // Step 2: Update each row to have a unique licenseKey
    const subscriptions = await queryInterface.sequelize.query(`SELECT id FROM "CeeSubscriptions"`);
    for (const subscription of subscriptions[0]) {
      await queryInterface.sequelize.query(
        `UPDATE "CeeSubscriptions" SET "licenseKey" = '${generateKey()}' WHERE id = '${subscription.id}'`
      );
    }

    // Step 3: Alter the licenseKey column to disallow null
    await queryInterface.changeColumn('CeeSubscriptions', 'licenseKey', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CeeSubscriptions', 'licenseKey');
  }
};