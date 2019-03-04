const router = require('express').Router();
const HttpStatus = require('http-status-codes');
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
const updateMultipleRecords = require('../utils/updateMultiRecords');

router.post('/gdrive', (req, res, next) => {
  const {
    'x-goog-channel-id': channelId,
    'x-goog-channel-expiration': expiration,
    'x-goog-resource-state': state,
    'x-goog-resource-id': resourceId,
    'x-goog-channel-token': secret
  } = req.headers;

  if (secret !== googleService.driveNotifySecret) {
    next({
      status: HttpStatus.BAD_REQUEST,
      log: '[POST] /notify/gdrive => INCORRECT SECRET'
    });
  }

  if (state !== 'change') res.send('success').status(200);

  googleDriveService
    .exportFile()
    .then(result => {
      if (result) return result;
      next({
        status: HttpStatus.NOT_FOUND,
        log: '[POST] /notify/gdrive => Google drive service file not found'
      });
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
      next({
        status: HttpStatus.BAD_REQUEST,
        log: `[POST] /notify/gdrive => Parsed resume returns with error: ${
          result.error
        }`
      });
    })
    .then(result => {
      res.send(result).status(200);
    })
    .catch(err =>
      next({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        log: `[POST] /notify/gdrive => ${err}`
      })
    );
});

module.exports = router;
