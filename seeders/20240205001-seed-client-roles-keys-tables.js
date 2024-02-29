'use strict';
const { v4: uuidv4 } = require('uuid');
const { randomBytes } = require('crypto');

function generateKey(size = 32, format = 'base64') {
    const buffer = randomBytes(size);
    return buffer.toString(format);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // skip seeding if there are already select queries for client_role, client, and api_key
    const clientRoleCount = await queryInterface.sequelize.query('SELECT COUNT(id) FROM "client_role"');
    const clientCount = await queryInterface.sequelize.query('SELECT COUNT(id) FROM "client"');
    const keyCount = await queryInterface.sequelize.query('SELECT COUNT(id) FROM "api_key"');

    if (clientRoleCount[0][0].count > 1 || clientCount[0][0].count > 1 || keyCount[0][0].count > 1) {
      return Promise.resolve(); // Skip the seeding
    }
    

    const publisherRoleId = uuidv4();
    const playerRoleId = uuidv4();
    const publisherClientId = uuidv4();
    const playerClientId = uuidv4();

    await queryInterface.bulkInsert('client_role', [{
        id: playerRoleId,
        name: 'cee-player-service',
        description: 'Authorizes the C2E Player to access the relevant resources'
      }, {
        id: publisherRoleId,
        name: 'cee-publisher-service',
        description: 'Authorizes the C2E Publisher to access the relevant resources'
      }], {});

    await queryInterface.bulkInsert('client', [{
        id: publisherClientId,
        email: 'testpublisher@curriki.org',
        client_role_id: publisherRoleId
      }, {
        id: playerClientId,
        email: 'testplayer@curriki.org',
        client_role_id: playerRoleId
      }], {});

    return queryInterface.bulkInsert('api_key', [{
        id: uuidv4(),
        key: generateKey(),
        client_id: publisherClientId
      }, {
        id: uuidv4(),
        key: generateKey(),
        client_id: playerClientId
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
    queryInterface.bulkDelete('api_key', null, {});
    queryInterface.bulkDelete('client', null, {});
    return queryInterface.bulkDelete('client_role', null, {});
  }
};