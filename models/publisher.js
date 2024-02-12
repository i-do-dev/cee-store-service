const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

const Publisher = sequelize.define('Publisher', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
});

module.exports = Publisher;