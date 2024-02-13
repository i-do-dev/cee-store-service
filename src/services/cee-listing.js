const CeeListing = require("../../models/cee-listing");
const {ApiKey, Client} = require("../../models");
const {LicenseTerms} = require('../../models');
const {CeeSubscription} = require('../../models');
const {ClientRole} = require('../../models');
const {Collection} = require('../../models');
const {CeeListingCollection} = require('../../models');

class CeeListingService {
  static async create(req) {

    try {  
      //get api call origin from request headers
      const origin = req.headers.host;
      const publisherClientId = req.Client.id;
      const ceeId = req.body.ceeId;
      const name = req.body.name;
      const subject = req.body.subject;
      const educationLevel = req.body.educationLevel;
      const keywords = req.body.keywords;
      const metaData = {subject, educationLevel, keywords};

      // create a new listing
      const ceeListing = await CeeListing.create({origin, ceeId, name, metaData, publisherClientId});

      // add cce listing to Subject's Collection otherwise Default Collection
      const defaultCollection = await Collection.findOrCreate({ where: {name: 'Default'}, defaults: {name: 'Default'}});
      if (Array.isArray(subject) && subject.length > 0) {
        // firstSubject as title case of subject[0]
        const firstSubject = (subject[0].charAt(0).toUpperCase() + subject[0].slice(1)).trim();
        // create subject collection if not exists otherwise get it
        const subjectCollection = await Collection.findOrCreate({ where: {name: firstSubject}, defaults: {name: firstSubject, parentCollectionId: defaultCollection[0].id}});
        CeeListingCollection.create({ceeListingId: ceeListing.id, collectionId: subjectCollection[0].id})
      } else {
        CeeListingCollection.create({ceeListingId: ceeListing.id, collectionId: defaultCollection[0].id})
      }

      // get first Client by ClientRole.name = 'cee-player-service'
      const playerClient = await Client.findOne({
        include: {
          model: ClientRole,
          as: 'ClientRole',
          where: {name: 'cee-player-service'}
        }
      });

      if (!playerClient) {
        throw new Error('Player client service not found');
      }

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
          playerClientId: playerClient.id
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
          playerClientId: playerClient.id
        });

        // make cee manifests on publisher service
        

      } else {
        throw new Error('Both license terms not found');
      }
      
    } catch (error) {
        throw error;
    }

  }
}

module.exports = CeeListingService;
