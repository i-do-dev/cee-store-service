'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename table
    await queryInterface.renameTable('Collections', 'collection');

    // Rename columns
    await queryInterface.renameColumn('collection', 'parentCollectionId', 'parent_collection_id');
    await queryInterface.renameColumn('collection', 'createdAt', 'created_at');
    await queryInterface.renameColumn('collection', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names
    await queryInterface.renameColumn('collection', 'parent_collection_id', 'parentCollectionId');
    await queryInterface.renameColumn('collection', 'created_at', 'createdAt');
    await queryInterface.renameColumn('collection', 'updated_at', 'updatedAt');

    // Revert table name
    await queryInterface.renameTable('collection', 'Collections');
  }
};