'use strict';

const { ref } = require("joi");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Collections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4() 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parentCollectionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Collections',
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
    await queryInterface.dropTable('Collections');
  }
};