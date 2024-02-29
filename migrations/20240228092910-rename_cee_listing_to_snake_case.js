'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('CeeListings', 'cee_listing');

    // Rename columns
    await queryInterface.renameColumn('cee_listing', 'ceeId', 'cee_master_id');
    await queryInterface.renameColumn('cee_listing', 'metaData', 'meta_data');
    await queryInterface.renameColumn('cee_listing', 'publisherServiceId', 'publisher_service_id');
    await queryInterface.renameColumn('cee_listing', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_listing', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('cee_listing', 'cee_master_id', 'ceeId');
    await queryInterface.renameColumn('cee_listing', 'meta_data', 'metaData');
    await queryInterface.renameColumn('cee_listing', 'publisher_service_id', 'publisherServiceId');
    await queryInterface.renameColumn('cee_listing', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_listing', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('cee_listing', 'CeeListings');
  }
};