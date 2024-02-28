const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");
const ApiKey = require('./api-key');
const ClientRole = require('./client-role');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, { 
  underscored: true,
  tableName: 'client'
});

Client.hasMany(ApiKey, {
  foreignKey: 'clientId'
});

ApiKey.belongsTo(Client, {
  foreignKey: 'clientId',
})

Client.belongsTo(ClientRole, {
  foreignKey: 'clientRoleId'
});

module.exports = Client;