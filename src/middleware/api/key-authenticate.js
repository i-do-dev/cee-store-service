const ApiKey = require('../../../models/api-key');
const Client = require('../../../models/client');
const ClientRole = require('../../../models/client-role');

const keyAuthenticateMiddleware = async (req, res, next) => {
  const key = req.header('X-API-KEY');
  if (!key) return res.status(401).json({ error: 'Invalid authorization' });

  const keyRecord = await ApiKey.findOne({
    where: { key: key },
    include: {
      model: Client,
      as: 'Client', // Specify the alias for the association
      include: {
        model: ClientRole,
        as: 'ClientRole'
      }
    },
  });
  
  if (!keyRecord) return res.status(401).json({ error: 'Invalid API key' });

  req.Client = keyRecord.Client;
  next();
};

module.exports = keyAuthenticateMiddleware;