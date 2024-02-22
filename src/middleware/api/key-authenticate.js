const ApiKey = require('../../../models/api-key');
const Client = require('../../../models/client');
const ClientRole = require('../../../models/client-role');

const keyAuthenticateMiddleware = async (req, res, next) => {
  const key = req.header('x-api-key');
  if (!key) return res.status(401).json({ error: 'cee-store-service: Missing API key' });

  const keyRecord = await ApiKey.findOne({
    where: { key: key },
    include: {
      model: Client,
      as: 'Client',
      include: {
        model: ClientRole,
        as: 'ClientRole'
      }
    },
  });
  
  if (!keyRecord) return res.status(401).json({ error: 'cee-store-service: Invalid API key' });

  req.Client = keyRecord.Client;
  next();
};

module.exports = keyAuthenticateMiddleware;