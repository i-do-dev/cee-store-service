const axios = require('axios');
const { responseHandler } = require("../utils/response");
const PublisherService = require('../../models/publisher-service');
class StreamController {
  static async getToken(req, res, next) {
    // find c2eid
    const c2eId = req.query.c2eId; // Assuming it exists for now, waiting on listing implementation
                                   // Should verify ownership using API key used to make request
    // check payment method
      // Assuming payment method is good until implementation
    // get publisherService and call for token
      // Each c2e related to a publisherService. Getting first one for testing until listing implementation
    const publisherService = await PublisherService.findOne();
    try {
      const options = {
        method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
        url: `${publisherService.host}/api/v1/stream/token?c2eid=${c2eId}`,
        headers: {
          'X-API-KEY': publisherService.key,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(options);
      return responseHandler({
        response: res,
        result: response.data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { StreamController };
