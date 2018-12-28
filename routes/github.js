const router = require('express').Router();
const { githubController } = require('../controllers');

router.get('/repos', githubController.allRepoDetails);

module.exports = router;
