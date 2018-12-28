const router = require('express').Router();
const { googleApiController } = require('../controllers');

router.get('/', googleApiController.getResumeFromDrive);

module.exports = router;
