const {Collection} = require('../../models');
const {CeeListingCollection} = require('../../models');
const {CeeListing} = require('../../models');
const {CeeSubscription} = require('../../models');
const {Client} = require('../../models');
const { sequelize } = require("../utils/database");

class CeeSubscriptionService {
    static async manifest(req) {
       /*
        // run follwoing custom query with db.sequelize.query
        const query = `
            WITH RECURSIVE HierarchicalData AS (
            SELECT "id", "name", "parentCollectionId"
            FROM "Collections"
            WHERE "parentCollectionId" IS NULL

            UNION ALL

            SELECT t.id, t.name, "t"."parentCollectionId"
            FROM "Collections" t
            INNER JOIN HierarchicalData h ON "t"."parentCollectionId" = h.id
            )  
            SELECT hd.id, hd.name, "hd"."parentCollectionId"
            FROM HierarchicalData as hd;
        `;
        const queryResult = await sequelize.query(query);
        // map queryResult to json data set
        const collectionsData = queryResult[0].map(row => {
            return {
                id: row.id,
                name: row.name,
                parentCollectionId: row.parentCollectionId
            }
        });
        
        const rs = collectionsData.map(async (collection) => {
            const ceeListingCollection = await CeeListingCollection.findAll({
                where: {
                    collectionId: collection.id
                }
            });
            const ceeListing = await CeeListing.findOne({
                where: {
                    id: ceeListingCollection.ceeListingId
                }
            });
            return {
                id: ceeListing.id,
                name: ceeListing.name,
                description: ceeListing.description,
                price: ceeListing.price
            }
        });
        
        console.log(rs);
        */

        // get all subscriptions by client id and include the cee listing
        const ceeSubscriptions = await CeeSubscription.findAll({
            where: {
                clientId: req.Client.id,
                type: 'licensed'
            },
            include: [
                {
                    model: CeeListing
                }
            ]
        });

        const rs = ceeSubscriptions.map(subscription => {
            const data = {
                name: subscription.CeeListing.name,
                subscriptionId: subscription.id,
            }
            return {
                ...data,
                ...subscription.CeeListing.metaData
            }
        });

        return rs;
    }
}

module.exports = CeeSubscriptionService;