const morgan = require('morgan');
const { loggerContainer } = require('../utils');

exports.notifyReqLogger = morgan(
  '[:method] :url :response-time ms [STATUS] :status [X-Goog-Channel-ID] :req[X-Goog-Channel-ID] [X-Goog-Resource-ID] :req[X-Goog-Resource-ID] [X-Goog-Resource-State] :req[X-Goog-Resource-State]',
  {
    skip: (req, res) => {
      let skip = true;
      if (
        req &&
        req.headers &&
        req.headers['X-Goog-Resource-State'.toLowerCase()] &&
        req.headers['X-Goog-Channel-ID'.toLowerCase()]
      )
        skip = false;
      return skip;
    },
    stream: {
      write: (message, encoding) => {
        loggerContainer.get('http').info(message);
      }
    }
  }
);

exports.apiReqLogger = morgan(
  '[:method] :url :response-time ms [STATUS] :status',
  {
    skip: (req, res) => {
      let skip = false;
      if (
        req &&
        req.headers &&
        req.headers['X-Goog-Resource-State'.toLowerCase()] &&
        req.headers['X-Goog-Channel-ID'.toLowerCase()]
      )
        skip = true;
      return skip;
    },
    stream: {
      write: (message, encoding) => {
        loggerContainer.get('http').info(message);
      }
    }
  }
);
