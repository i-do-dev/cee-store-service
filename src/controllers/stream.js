const axios = require('axios');
const { responseHandler } = require("../utils/response");
class StreamController {
  static async getToken(req, res, next) {
    try {
      return responseHandler({
        response: res,
        result: {token: '123token'},
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { StreamController };
