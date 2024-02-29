'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const collections = await queryInterface.sequelize.query(
      `SELECT * FROM "collection" WHERE name = 'Default'`,
      { type: QueryTypes.SELECT }
    );

    if (collections.length === 0) {
      return queryInterface.bulkInsert('collection', [{
        id: uuidv4(),
        name: 'Default',
        parent_collection_id: null,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('collection', { name: 'Default' }, {});
  }
};