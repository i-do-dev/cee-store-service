'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('resetPasswordTokens', 'reset_password_token');

    // Rename columns: createdAt, updatedAt
    await queryInterface.renameColumn('reset_password_token', 'createdAt', 'created_at');
    await queryInterface.renameColumn('reset_password_token', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names: createdAt, updatedAt
    await queryInterface.renameColumn('reset_password_token', 'created_at', 'createdAt');
    await queryInterface.renameColumn('reset_password_token', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('reset_password_token', 'resetPasswordTokens');
  }
};