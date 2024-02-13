'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const collections = await queryInterface.sequelize.query(
      `SELECT * FROM "Collections" WHERE name = 'Default'`,
      { type: QueryTypes.SELECT }
    );

    if (collections.length === 0) {
      return queryInterface.bulkInsert('Collections', [{
        id: uuidv4(),
        name: 'Default',
        parentCollectionId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Collections', { name: 'Default' }, {});
  }
};