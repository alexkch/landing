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
const { googleDriveService, resumeParserService } = require('../services');
const { updateMultipleRecords } = require('../utils/updateMultiRecords');

router.get('/test', (req, res) => {
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

router.get('/start', (req, res) => {
  googleDriveService
    .requestWebhook()
    .then(result => {
      console.log(result);
      res.send('ssuccess').status(200);
      // mongoDbService.createOrUpdateRecord;
    })
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  // const {
  //   'x-goog-channel-id': channelId,
  //   'x-goog-channel-expiration': expiration,
  //   'x-goog-resource-state': state,
  //   'x-goog-resource-id': resourceId,
  //   'x-goog-channel-token': secret
  // } = req.headers;
  console.log('RECIEVED HOOK');
  res.send('success').status(200);

  // switch (state) {
  //   case 'change':
  //     break;
  //   case 'sync':
  //   default:
  //     break;
  // }

  // googleDriveService
  //   .exportFile()
  //   .then(result => {
  //     if (result) return result;
  //   })
  //   .then(result => resumeParserService(result))
  //   .then(result => {
  //     if (result && !result.error) {
  //       const {
  //         'technical skills': skills,
  //         'work experience': experiences,
  //         projects
  //       } = result;
  //       return Promise.all([
  //         mongoDbService.createOrUpdateRecord(Project, projects),
  //         mongoDbService.createOrUpdateRecord(Experience, experiences),
  //         mongoDbService.createOrUpdateRecord(Skill, skills)
  //       ]);
  //     }
  //   })
  //   .then(() => {
  //     console.log('SUCCESS');
  //   })
  //   .catch(err => console.log(err));
});

module.exports = router;
