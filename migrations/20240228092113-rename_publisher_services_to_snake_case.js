'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('PublisherServices', 'publisher_services');

    // Rename columns
    await queryInterface.renameColumn('publisher_service', 'clientId', 'client_id');
    // Add other columns to rename here...
    // createdAt, updatedAt
    await queryInterface.renameColumn('publisher_service', 'createdAt', 'created_at');
    await queryInterface.renameColumn('publisher_service', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('publisher_service', 'client_id', 'clientId');
    // Add other columns to revert here...
    // createdAt, updatedAt
    await queryInterface.renameColumn('publisher_service', 'created_at', 'createdAt');
    await queryInterface.renameColumn('publisher_service', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('publisher_service', 'PublisherServices');
  }
};