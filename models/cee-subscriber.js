// CeeSubscriber model with attributes: id, name, email
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");
const CeeSubscription = require('./cee-subscription');

class CeeSubscriber extends Model {}

CeeSubscriber.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize
});

CeeSubscriber.hasMany(CeeSubscription, {
    foreignKey: 'ceeSubscriberId',
    sourceKey: 'id',
    references: {
        model: 'CeeSubscription',
        key: 'id'
    }
});

CeeSubscription.belongsTo(CeeSubscriber, {
    foreignKey: 'ceeSubscriberId',
    targetKey: 'id',
    references: {
        model: 'CeeSubscriber',
        key: 'id'
    }
});

module.exports = CeeSubscriber