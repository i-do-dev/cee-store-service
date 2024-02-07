const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");
const Client = require('./client');

const ClientRole = sequelize.define('ClientRole', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
});

module.exports = ClientRole;