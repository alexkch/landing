const router = require('express').Router();
const { githubController } = require('../controllers');

router.get('/contributor', githubController.getContributors);
router.get('/all', githubController.getGitInfo);

module.exports = router;
