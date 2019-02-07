const { google } = require('googleapis');
const __googleAuth = require('./__googleAuthService');
const { fileId, folderId, mimeType, scope } = require('config').get(
  'googleServiceConfig.drive'
);
const drive = google.drive('v3');

exports.exportFile = options =>
  drive.files
    .export({
      auth: __googleAuth({ scope: scope }),
      fileId: fileId,
      mimeType: mimeType
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
    })
    .catch(err => console.log('no files found'));
};

// 3 minutes =  300000 ms
//750000
exports.pushNotification = options => {
  return drive.changes
    .getStartPageToken({
      auth: __googleAuth({ scope: scope })
    })
    .then(({ data }) => {
      console.log(new Date(Date.now() + 180000));
      if (data && data.startPageToken) return data.startPageToken;
    })
    .then(token =>
      drive.changes.watch({
        pageToken: token,
        auth: __googleAuth({ scope: scope }),
        resource: {
          id: 'id12345678x',
          type: 'web_hook',
          expiration: Date.now() + 300000,
          payload: true,
          token: 'TESTTOKEN9999999',
          address: 'https://17459f70.ngrok.io/pipeline/webhook'
        }
      })
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
