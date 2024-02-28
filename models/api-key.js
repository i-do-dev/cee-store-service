const { v4: uuidv4 } = require('uuid');
const { randomBytes } = require('crypto');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

function generateKey(size = 32, format = 'base64') {
    const buffer = randomBytes(size);
    return buffer.toString(format);
}

const ApiKey = sequelize.define('ApiKey', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
    },
    key: {
        type: DataTypes.STRING,
        defaultValue: () => generateKey(),
        allowNull: false,
        unique: true,
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false
    },
},
{
    underscored: true,
    tableName: 'api_key'
});

module.exports = ApiKey;