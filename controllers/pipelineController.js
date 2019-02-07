const router = require('express').Router();
const { Project, Experience, Skill, Repo, Personal } = require('../db/models');
const { breakpoints } = require('config').get('parserServiceConfig');
const {
  googleDriveService,
  resumeParserService,
  mongoDbService
} = require('../services');

router.get('/', (req, res) => {
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
          mongoDbService.createOrUpdateRecord(Project, projects),
          mongoDbService.createOrUpdateRecord(Experience, experiences),
          mongoDbService.createOrUpdateRecord(Skill, skills)
        ]);
      }
    })
    .then(result => {
      res.send(result).status(200);
    })
    .catch(err => console.log(err));
});

router.get('/test', (req, res) => {
  googleDriveService
    .pushNotification()
    .then(result => res.send(result).status(200))
    .catch(err => console.log(err));
});

router.post('/notification', (req, res) => {
  console.log(req.headers);
  res.send('success').status(200);
});

module.exports = router;
