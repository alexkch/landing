const router = require('express').Router();
const {
  Project,
  Experience,
  Skill,
  Repo,
  Personal,
  Server
} = require('../db/models');
const { breakpoints } = require('config').get('parserServiceConfig');
const { googleService } = require('../config/credentials');
const { googleDriveService, resumeParserService } = require('../services');
const { updateMultipleRecords } = require('../utils/updateMultiRecords');

router.post('/gdrive', (req, res) => {
  const {
    'x-goog-channel-id': channelId,
    'x-goog-channel-expiration': expiration,
    'x-goog-resource-state': state,
    'x-goog-resource-id': resourceId,
    'x-goog-channel-token': secret
  } = req.headers;

  if (secret !== googleService.driveNotifySecret) {
    console.log('ERROR');
    return;
  }

  if (state !== 'change') res.send('success').status(200);

  googleDriveService
    .exportFile()
    .then(result => {
      if (result) return result;
      next({ status: 404 });
    })
    .then(result => resumeParserService(result))
    .then(result => {
      if (result && !result.error) {
        const {
          'technical skills': skills,
          'work experience': experiences,
          projects
        } = result;
        return Promise.all([
          updateMultipleRecords(Project, projects),
          updateMultipleRecords(Experience, experiences),
          updateMultipleRecords(Skill, skills)
        ]);
      }
    })
    .then(result => {
      res.send(result).status(200);
    })
    .catch(err => console.log(err));
});

module.exports = router;
