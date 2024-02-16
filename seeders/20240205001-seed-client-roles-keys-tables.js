'use strict';
const { v4: uuidv4 } = require('uuid');
const { randomBytes } = require('crypto');

function generateKey(size = 32, format = 'base64') {
    const buffer = randomBytes(size);
    return buffer.toString(format);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // skip seeding if there are already select queries for ClientRoles, Clients, and ApiKeys
    const clientRoleCount = await queryInterface.sequelize.query('SELECT COUNT(id) FROM "ClientRoles"');
    const clientCount = await queryInterface.sequelize.query('SELECT COUNT(id) FROM "Clients"');
    const keyCount = await queryInterface.sequelize.query('SELECT COUNT(id) FROM "ApiKeys"');

    if (clientRoleCount[0][0].count > 1 || clientCount[0][0].count > 1 || keyCount[0][0].count > 1) {
      return Promise.resolve(); // Skip the seeding
    }
    

    const publisherRoleId = uuidv4();
    const playerRoleId = uuidv4();
    const publisherClientId = uuidv4();
    const playerClientId = uuidv4();

    await queryInterface.bulkInsert('ClientRoles', [{
        id: playerRoleId,
        name: 'cee-player-service',
        description: 'Authorizes the C2E Player to access the relevant resources'
      }, {
        id: publisherRoleId,
        name: 'cee-publisher-service',
        description: 'Authorizes the C2E Publisher to access the relevant resources'
      }], {});

    await queryInterface.bulkInsert('Clients', [{
        id: publisherClientId,
        email: 'testpublisher@curriki.org',
        clientRoleId: publisherRoleId
      }, {
        id: playerClientId,
        email: 'testplayer@curriki.org',
        clientRoleId: playerRoleId
      }], {});

    return queryInterface.bulkInsert('ApiKeys', [{
        id: uuidv4(),
        key: generateKey(),
        clientId: publisherClientId
      }, {
        id: uuidv4(),
        key: generateKey(),
        clientId: playerClientId
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    const clientRoleCount = await queryInterface.sequelize.models.ClientRole.count();
    const clientCount = await queryInterface.sequelize.models.Client.count();
    const keyCount = await queryInterface.sequelize.models.ApiKey.count();
  
    if (clientRoleCount > 2 || clientCount > 2 || keyCount > 2) {
      console.log('Skipping deletion of ClientRole, Client and ApiKey tables due to existing records.');
      return Promise.resolve(); // Skip the deletion
    }
  
    // Otherwise, proceed with bulk deletion
    queryInterface.bulkDelete('ApiKeys', null, {});
    queryInterface.bulkDelete('Clients', null, {});
    return queryInterface.bulkDelete('ClientRoles', null, {});
  }
};