// Model CeeListingCollection with id, name and keyworks
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

const CeeListingCollection = sequelize.define('CeeListingCollection', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    ceeListingId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    collectionId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
},
{
    underscored: true,
    tableName: 'cee_listing_collection'
});

module.exports = CeeListingCollection;