const { responseHandler } = require("../utils/response");
const CeeSubscriptionService = require("../services/cee-subscription");

class CeeSubscriptionController {
    static async manifest(req, res, next) {
        try {
            const ceeSubscriptions = await CeeSubscriptionService.manifest(req);
            // Send a response
            responseHandler({
                response: res, 
                result: ceeSubscriptions
            });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }
}
module.exports = { CeeSubscriptionController }