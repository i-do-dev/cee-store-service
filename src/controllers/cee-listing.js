const { responseHandler } = require("../utils/response");
const CeeListingService = require("../services/cee-listing");

class CeeListingController {
    static async create(req, res, next) {
        try {
            const ceeListing = CeeListingService.create(req);
            // Send a response
            responseHandler({
                response: res, 
                result: "C2E Listing created successfully!"
            });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }
}
module.exports = { CeeListingController }