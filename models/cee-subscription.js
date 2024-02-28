// License terms model with attributes id, title, type, terms, amount, currency, copyrightNotice, license
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");
const {generateKey} = require('../src/utils/key')

const CeeSubscription = sequelize.define('CeeSubscription', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    ceeListingId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseTerms: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    copyrightNotice: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    license: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    licenseStartDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    licenseEndDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false
    }
},
{
    underscored: true,
    tableName: 'cee_subscription'
});

module.exports = CeeSubscription