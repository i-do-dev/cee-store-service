// Model Category with id, name and keyworks
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../src/utils/database");

const Category = sequelize.define('Category',{
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
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
}, 
{
    underscored: true,
    tableName: 'category'
});

module.exports = Category;