const router = require('express').Router();
const { googleDriveService, resumeParserService } = require('../services');

router.get('/', (req, res) => {
  googleDriveService
    .exportFile()
    .then(result => {
      if (result) return result;
      next({ status: 404 });
    })
    .then(result => resumeParserService(result))
    .then(result => {
      if (result) res.send(result);
    })
    .catch(err => console.log(err));
});

module.exports = router;
