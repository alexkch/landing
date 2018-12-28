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
