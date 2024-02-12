// models/index.js
const CeeListing = require('./cee-listing');
const CeeSubscription = require('./cee-subscription');
const ApiKey = require('./api-key');
const CeeSubscriber = require('./cee-subscriber');
const LicenseTerms = require('./license-terms');
const CeeListingCollection = require('./cee-listing-collection');
const Collection = require('./collection/collection')

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

CeeListing.hasMany(CeeListingCollection, {
    foreignKey: 'ceeListingId',
    targetKey: 'id',
    references: {
        model: 'CeeListingCollection',
        key: 'id'
    }
});

CeeListingCollection.belongsTo(CeeListing, {
    foreignKey: 'ceeListingId',
    targetKey: 'id',
    references: {
        model: 'CeeListing',
        key: 'id'
    }
});

Collection.hasMany(CeeListingCollection, {
    foreignKey: 'collectionId',
    targetKey: 'id',
    references: {
        model: 'CeeListingCollection',
        key: 'id'
    }
});

CeeListingCollection.belongsTo(Collection, {
    foreignKey: 'collectionId',
    targetKey: 'id',
    references: {
        model: 'Collection',
        key: 'id'
    }
});

module.exports = {
    CeeListing,
    CeeSubscription,
    ApiKey,
    LicenseTerms,
    CeeSubscriber,
    CeeListingCollection,
    Collection
};