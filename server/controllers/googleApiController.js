const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const { googleDriveService } = require('../services');

router.get('/', (req, res, next) => {
  googleDriveService
    .exportFile()
    .then(result => {
      if (result) return res.send(result);
      next({
        status: HttpStatus.NOT_FOUND,
        log: '[GET] /gapi/ => Gdrive file not found'
      });
    })
    .catch(err =>
      next({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        log: `[GET] /gapi/ => ${err}`
      })
    );
});

module.exports = router;
