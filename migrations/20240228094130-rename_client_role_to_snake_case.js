'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('ClientRoles', 'client_role');

    // Rename columns
    await queryInterface.renameColumn('client_role', 'createdAt', 'created_at');
    await queryInterface.renameColumn('client_role', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('client_role', 'created_at', 'createdAt');
    await queryInterface.renameColumn('client_role', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('client_role', 'ClientRoles');
  }
};