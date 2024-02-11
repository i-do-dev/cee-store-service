'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CeeSubscriptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      ceeListingId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseTerms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      copyrightNotice: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      license: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      licenseStartDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      licenseEndDate: {
        type: Sequelize.DATE,
        allowNull: true,
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

    await queryInterface.addConstraint('CeeSubscriptions', {
      fields: ['ceeListingId'],
      type: 'foreign key',
      name: 'ceeListingId_fkey',
      references: {
        table: 'CeeListings',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CeeSubscriptions');
  },
};