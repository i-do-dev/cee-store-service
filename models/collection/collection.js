// Model Collection with id, name and keyworks
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../src/utils/database");

const Collection = sequelize.define('Collection', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    keywords: {
        type: DataTypes.JSONB,
        allowNull: true,
    }
});

module.exports = Collection;