'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('CeeListingCollections', 'cee_listing_collection');

    // Rename columns
    await queryInterface.renameColumn('cee_listing_collection', 'ceeListingId', 'cee_listing_id');
    await queryInterface.renameColumn('cee_listing_collection', 'collectionId', 'collection_id');
    await queryInterface.renameColumn('cee_listing_collection', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_listing_collection', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('cee_listing_collection', 'cee_listing_id', 'ceeListingId');
    await queryInterface.renameColumn('cee_listing_collection', 'collection_id', 'collectionId');
    await queryInterface.renameColumn('cee_listing_collection', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_listing_collection', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('cee_listing_collection', 'CeeListingCollections');
  }
};