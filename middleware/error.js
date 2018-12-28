const {
  defaultStatus,
  defaultMsg,
  _400Msg,
  _401Msg,
  _403Msg,
  _404Msg,
  genericMsg
} = require('config').get('errorConfig');

module.exports = (err, req, res, next) => {
  console.log('In errorX');
  let msg;
  if (err && err.status) {
    switch (err.status) {
      case 400:
        msg = _400Msg;
        break;
      case 401:
        msg = _401Msg;
        break;
      case 403:
        msg = _403Msg;
        break;
      case 404:
        msg = _404Msg;
        break;
      default:
        msg = genericMsg;
        break;
    }
  }
  res.status(err.status || defaultStatus).send({ Error: msg || defaultMsg });
};
