'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('ApiKeys', 'api_key');

    // Rename columns
    await queryInterface.renameColumn('api_key', 'clientId', 'client_id');
    await queryInterface.renameColumn('api_key', 'createdAt', 'created_at');
    await queryInterface.renameColumn('api_key', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('api_key', 'client_id', 'clientId');
    await queryInterface.renameColumn('api_key', 'created_at', 'createdAt');
    await queryInterface.renameColumn('api_key', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('api_key', 'ApiKeys');
  }
};