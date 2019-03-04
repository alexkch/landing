const { google } = require('googleapis');
const uuidv1 = require('uuid/v1');
const { loggerContainer } = require('../utils');
const __googleAuth = require('./__googleAuthService');
const { googleService } = require('../config/credentials');
const { resume_v1, webhookExpiryTime, scope } = require('config').get(
  'googleDriveServiceConfig'
);
const { fileId, folderId } = resume_v1;
const { baseUri } = require('config').get('appConfig');
const drive = google.drive('v3');

exports.exportFile = options =>
  drive.files
    .export({
      auth: __googleAuth({ scope: scope }),
      fileId: fileId,
      mimeType: 'text/plain'
    })
    .then(({ data }) => data);

exports.listFiles = options => {
  drive.files
    .list({
      auth: __googleAuth({ scope: scope }),
      pageSize: 10,
      q: `"${folderId}" in parents and trashed=false`,
      fields: 'files(id, name)'
    })
    .then(({ data }) => {
      if (data && data.files)
        data.files.map(file => console.log(`${file.name} ${file.id}`));
      return data;
    });
};

exports.requestWebhook = options => {
  console.log('\nGSERVICE:::REQUEST WEBHOOK');
  loggerContainer.get('server').info('GSERVICE requesting webhook');
  return drive.changes
    .getStartPageToken({
      auth: __googleAuth({ scope: scope })
    })
    .then(({ data }) => {
      if (data && data.startPageToken) return data.startPageToken;
    })
    .then(token =>
      drive.changes.watch({
        pageToken: token,
        auth: __googleAuth({ scope: scope }),
        resource: {
          id: uuidv1(),
          type: 'web_hook',
          expiration: Date.now() + webhookExpiryTime,
          payload: true,
          token: googleService.driveNotifySecret,
          address: `${baseUri}/notify/gdrive`
        }
      })
    )
    .then(({ data }) => data);
};
