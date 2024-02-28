const CeeListing = require("../../models/cee-listing");
const {ApiKey, Client} = require("../../models");
const {LicenseTerms} = require('../../models');
const {CeeSubscription} = require('../../models');
const {ClientRole} = require('../../models');
const {Collection} = require('../../models');
const {CeeListingCollection} = require('../../models');
const {PublisherService} = require('../../models');

class CeeListingService {
  static async create(req) {

    try {  
      const ceeMasterId = req.body.ceeMasterId;
      const name = req.body.name;
      const description = req.body.description;
      const subject = req.body.subject;
      const educationLevel = req.body.educationLevel;
      const keywords = req.body.keywords;
      const thumbnailUrl = req.body.thumbnailUrl;
      const metaData = {description, subject, educationLevel, keywords, thumbnailUrl};

      
      const publisherClientId = req.body.publisherClientId;
      // get PublisherService by clientId with value of publisherClientId
      const publisherService = await PublisherService.findOne({where: {clientId: publisherClientId}});
      if (!publisherService) {
        throw new Error('Publisher service not added to the store');
      }

      // create a new listing
      const ceeListing = await CeeListing.create({ceeMasterId, name, metaData, publisherServiceId: publisherService.id});


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
          clientId: playerClient.id
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
          clientId: playerClient.id
        });
        
        // get PublisherService by clientId with value of publisherClientId
        const publisherService = await PublisherService.findOne({where: {clientId: publisherClientId}});
        // make axios request to publisherService.host with previewCeeSubscription and licensedCeeSubscription as payload and publisherService.key as header
        const axios = require('axios');
        const apikey = publisherService.key
        const postUrl = publisherService.host + '/api/v1/c2e/manifest';
        const postData = {
          ceeMasterId,
          previewCeeSubscription: {...previewCeeSubscription.dataValues},
          licensedCeeSubscription: {...licensedCeeSubscription.dataValues}
        }

        const response = await axios.post(postUrl, postData, {
          headers: {
            'x-api-key': apikey
          }
        });

        if (response.status === 200) {
          return ceeListing;
        } else {
          throw new Error('Error creating cee listing');
        }

      } else {
        throw new Error('Both license terms not found');
      }
      
    } catch (error) {
        throw error;
    }

  }
}

module.exports = CeeListingService;
