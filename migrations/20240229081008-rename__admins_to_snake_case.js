'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('admins', 'admin');

    // Rename columns
    await queryInterface.renameColumn('admin', 'createdAt', 'created_at');
    await queryInterface.renameColumn('admin', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('admin', 'created_at', 'createdAt');
    await queryInterface.renameColumn('admin', 'updated_at', 'updatedAt');
    
    // Revert table name
    await queryInterface.renameTable('admin', 'admins');
  }
};