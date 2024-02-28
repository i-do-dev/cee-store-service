const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

const PublisherService = sequelize.define('PublisherService', {
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
    host: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
},
{
    underscored: true,
    tableName: 'publisher_service'
});

module.exports = PublisherService;