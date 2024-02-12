// models/index.js
const CeeListing = require('./cee-listing');
const CeeSubscription = require('./cee-subscription');
const ApiKey = require('./api-key');
const CeeSubscriber = require('./cee-subscriber');

CeeListing.belongsTo(ApiKey, {
    foreignKey: 'apiKeyId',
    targetKey: 'id',
    references: {
        model: 'ApiKey',
        key: 'id'
    }
});

ApiKey.hasMany(CeeListing, {
    foreignKey: 'apiKeyId',
    sourceKey: 'id',
    references: {
        model: 'CeeListing',
        key: 'id'
    }
});

CeeListing.hasMany(CeeSubscription, {
    foreignKey: 'ceeListingId',
    sourceKey: 'id',
    references: {
        model: 'CeeSubscription',
        key: 'id'
    }
});

CeeSubscription.belongsTo(CeeListing, {
    foreignKey: 'ceeListingId',
    targetKey: 'id',
    references: {
        model: 'CeeListing',
        key: 'id'
    }
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

module.exports = {
    CeeListing,
    CeeSubscription,
    ApiKey
};