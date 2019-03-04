const { loggerContainer } = require('../utils');
const HttpStatus = require('http-status-codes');

module.exports = (err, req, res, next) => {
  loggerContainer.get('server').error(err.log);
  res.status(err.status).send({
    error: HttpStatus.getStatusText(err.status)
  });
};
