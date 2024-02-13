// models/index.js
const CeeListing = require('./cee-listing');
const CeeSubscription = require('./cee-subscription');
const ApiKey = require('./api-key');
const LicenseTerms = require('./license-terms');
const CeeListingCollection = require('./cee-listing-collection');
const Collection = require('./collection/collection');
const Client = require('./client');
const ClientRole = require('./client-role');

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

Client.hasMany(CeeListing, {
    foreignKey: 'publisherClientId',
    targetKey: 'id',
    references: {
        model: 'CeeListing',
        key: 'id'
    }
});

CeeListing.belongsTo(Client, {
    foreignKey: 'publisherClientId',
    targetKey: 'id',
    references: {
        model: 'Client',
        key: 'id'
    }
});

Client.hasMany(CeeSubscription, {
    foreignKey: 'playerClientId',
    targetKey: 'id',
    references: {
        model: 'CeeSubscription',
        key: 'id'
    }
});

CeeSubscription.belongsTo(Client, {
    foreignKey: 'playerClientId',
    targetKey: 'id',
    references: {
        model: 'Client',
        key: 'id'
    }
});

// Collection relatonships with Collection via parentCollectionId
Collection.hasMany(Collection, {
    foreignKey: 'parentCollectionId',
    targetKey: 'id',
    as: 'childCollections'
});

Collection.belongsTo(Collection, {
    foreignKey: 'parentCollectionId',
    targetKey: 'id',
    as: 'parentCollection'
});

module.exports = {
    CeeListing,
    CeeSubscription,
    ApiKey,
    LicenseTerms,
    CeeListingCollection,
    Collection,
    Client,
    ClientRole
};