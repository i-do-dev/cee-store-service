const CeeListing = require("../../models/cee-listing");
const ApiKey = require("../../models/api-key");

class CeeListingService {
  static async create(req) {
    //get api call origin from request headers
    const origin = req.headers.origin;
    // get api key from x-api-key header parameter
    const apiKeyParam = req.headers['x-api-key'];
    
    const apiKey = await ApiKey.findOne({where: {key: apiKeyParam}});
    const apiKeyId = apiKey.id;
    const ceeId = req.body.ceeId;
    const name = req.body.name;

    try {  
        // create a new listing
        const ceeListing = await CeeListing.create({origin, ceeId, name, apiKeyId});
        
    } catch (error) {
        throw error;
    }

  }
}

module.exports = CeeListingService;