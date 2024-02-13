const axios = require('axios');
const { responseHandler } = require("../utils/response");
const Publisher = require('../../models/publisher');
class StreamController {
  static async getToken(req, res, next) {
    // find c2eid
    const c2eId = req.query.c2eId; // Assuming it exists for now, waiting on listing implementation
                                   // Should verify ownership using API key used to make request
    // check payment method
      // Assuming payment method is good until implementation
    // get publisher and call for token
      // Each c2e related to a publisher. Getting first one for testing until listing implementation
    const publisher = await Publisher.findOne();
    try {
      const options = {
        method: 'GET', // Adjust the HTTP method as needed (GET, POST, etc.)
        url: `${publisher.url}/api/v1/stream/token?c2eid=${c2eId}`,
        headers: {
          'X-API-KEY': publisher.key,
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
