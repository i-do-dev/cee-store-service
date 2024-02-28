'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('Clients', 'client');

    // Rename columns
    await queryInterface.renameColumn('client', 'clientRoleId', 'client_role_id');
    await queryInterface.renameColumn('client', 'createdAt', 'created_at');
    await queryInterface.renameColumn('client', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('client', 'client_role_id', 'clientRoleId');
    await queryInterface.renameColumn('client', 'created_at', 'createdAt');
    await queryInterface.renameColumn('client', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('client', 'Clients');
  }
};