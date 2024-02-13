const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

const CeeListing = sequelize.define('CeeListing', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ceeId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metaData: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    publisherClientId: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = CeeListing