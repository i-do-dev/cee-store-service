// Model Category with id, name and keyworks
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../src/utils/database");
const Category = require('./category');

const Category = sequelize.define('Category',{
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    collectionId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
},
{
    underscored: true,
    tableName: 'collection_category'
});

module.exports = Category;