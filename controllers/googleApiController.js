const router = require('express').Router();
const { googleDriveService } = require('../services');

router.get('/', (req, res) => {
  googleDriveService
    .exportFile()
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
});

module.exports = router;
