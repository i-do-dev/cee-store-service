'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ApiKeys', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      clientId: {
        type: Sequelize.UUID,
        references: {
          model: 'Clients',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ApiKeys');
  }
};