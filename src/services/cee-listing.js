const CeeListing = require("../../models/cee-listing");
const {ApiKey} = require("../../models");
const {LicenseTerms} = require('../../models');
const {CeeSubscription} = require('../../models');
const {CeeSubscriber} = require('../../models');
const {Collection} = require('../../models');
const {CeeListingCollection} = require('../../models');

class CeeListingService {
  static async create(req) {

    try {  
      //get api call origin from request headers
      const origin = req.headers.host;
      // get api key from x-api-key header parameter
      const apiKeyParam = req.headers['x-api-key'];
      
      const apiKey = await ApiKey.findOne({where: {key: apiKeyParam}});
      const apiKeyId = apiKey.id;
      const ceeId = req.body.ceeId;
      const name = req.body.name;
      // create a new listing
      const ceeListing = await CeeListing.create({origin, ceeId, name, apiKeyId});

      // add cce listing to Default Collection
      const [collection] = await Collection.findOrCreate({ where: {name: 'Default'}, defaults: {name: 'Default'}});
      CeeListingCollection.create({ceeListingId: ceeListing.id, collectionId: collection.id})


      // create CeeSubscriber if not exists
      const [ceeSubscriber] = await CeeSubscriber.findOrCreate({ 
        where: {email: req.body.creator.email},
        defaults: {name: req.body.creator.name, email: req.body.creator.email}
      });

      // get LicenseTerms where type is 'preview'
      const previewLicenseTerms = await LicenseTerms.findOne({where: {type: 'preview'}});
      
      // get LicenseTerms where type is 'licensed'
      const licensedLicenseTerms = await LicenseTerms.findOne({where: {type: 'licensed'}});
      
      if (previewLicenseTerms && licensedLicenseTerms) {
        const previewCeeSubscription = await CeeSubscription.create({
          ceeListingId: ceeListing.id,
          type: previewLicenseTerms.type,
          licenseType: previewLicenseTerms.licenseType,
          licenseTerms: previewLicenseTerms.licenseTerms,
          amount: previewLicenseTerms.amount,
          currency: previewLicenseTerms.currency,
          copyrightNotice: previewLicenseTerms.copyrightNotice,
          license: previewLicenseTerms.license,
          ceeSubscriberId: ceeSubscriber.id
        });

        const licensedCeeSubscription = await CeeSubscription.create({
          ceeListingId: ceeListing.id,
          type: licensedLicenseTerms.type,
          licenseType: licensedLicenseTerms.licenseType,
          licenseTerms: licensedLicenseTerms.licenseTerms,
          amount: licensedLicenseTerms.amount,
          currency: licensedLicenseTerms.currency,
          copyrightNotice: licensedLicenseTerms.copyrightNotice,
          license: licensedLicenseTerms.license,
          ceeSubscriberId: ceeSubscriber.id
        });

      } else {
        throw new Error('Both license terms not found');
      }
      
    } catch (error) {
        throw error;
    }

  }
}

module.exports = CeeListingService;
