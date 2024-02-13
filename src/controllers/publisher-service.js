const { responseHandler } = require("../utils/response");
const models = require("../../models");

class PublisherServiceController {
    static async list(req, res, next) {
        try {
          // Get all records from PublisherService model
          const publisherServices = await models.PublisherService.findAll();
          const publisherServicesData = publisherServices.map((publisherService) => {
            return {
              id: publisherService.id,
              name: publisherService.name,
              host: publisherService.host,
              key: publisherService.key,
              clientId: publisherService.clientId
            };
          });

          // Send a response
          responseHandler({
            response: res, 
            result: publisherServicesData
          });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }

    static async create(req, res, next) {
        try {
          // Create a new record in PublisherService model
          const publisherService = await models.PublisherService.create({
            name: req.body.name,
            host: req.body.host,
            key: req.body.key,
            clientId: req.body.clientId
          });

          // Send a response
          responseHandler({
            response: res, 
            result: publisherService
          });
        } catch (error) {
          // Send an error response
          next(error);
        }
    }
}
module.exports = { PublisherServiceController }