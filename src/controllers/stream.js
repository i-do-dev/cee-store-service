const axios = require('axios');
const { responseHandler } = require("../utils/response");
const CustomError = require("../utils/error");
const PublisherService = require('../../models/publisher-service');
const Subscription = require('../../models/cee-subscription');
const CeeListing = require('../../models/cee-listing');

class StreamController {
  static async getToken(req, res, next) {
    // Check sub belongs to client
    const subscription = await Subscription.findOne({ 
      where: {
        id: req.query.subid,
        clientId: req.Client.id
      },
      include: {
        model: CeeListing,
        include: {
          model: PublisherService,
        }
      }
    });

    if (!subscription) {
      const error = new CustomError({code: 404, message: 'cee-store-service: Subscription ID not found'});
      return next(error);
    }

    try {
      const options = {
        method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
        url: `${subscription.CeeListing.PublisherService.host}/api/v1/stream/token?subid=${subscription.id}`,
        headers: {
          'X-API-KEY': subscription.CeeListing.PublisherService.key,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(options);
      return responseHandler({
        response: res,
        result: response.data.result
      });
    } catch (error) {
      next(error);
    }
  }

  // Retrieves the manifest for a particular subscription from the publisher
  static async getManifest(req, res, next) {
    const subscription = await Subscription.findOne({ 
      where: {
        id: req.query.subid,
        clientId: req.Client.id
      },
      include: {
        model: CeeListing,
        include: {
          model: PublisherService,
        }
      }
    });

    if (!subscription) {
      const error = new CustomError({code: 404, message: 'cee-store-service: Subscription ID not found'});
      return next(error);
    }

    try {
      const options = {
        method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
        url: `${subscription.CeeListing.PublisherService.host}/api/v1/stream/manifest?subid=${subscription.id}`,
        headers: {
          'X-API-KEY': subscription.CeeListing.PublisherService.key,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(options);
      return responseHandler({
        response: res,
        result: response.data.result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { StreamController };
