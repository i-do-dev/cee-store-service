// License terms model with attributes id, title, type, terms, amount, currency, copyrightNotice, license
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

const LicenseTerms = sequelize.define('LicenseTerms', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
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
    }
},
{
    underscored: true,
    tableName: 'license_terms'
});

module.exports = LicenseTerms