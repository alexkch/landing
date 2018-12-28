const { google } = require('googleapis');
const { googleService } = require('../config/credentials');

module.exports = options => {
  const jwtToken = new google.auth.JWT(
    googleService.user,
    null,
    googleService.pass,
    [options.scope],
    null
  );
  jwtToken
    .authorize()
    .then(token => {
      console.log('Token Auth Successful');
    })
    .catch(err => console.log(err));
  return jwtToken;
};
