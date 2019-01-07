const router = require('express').Router();
const { githubService, githubQlService } = require('../services');

router.get('/contributor', (req, res) => {
  githubService
    .contributors(req.query)
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
});

router.get('/all', (req, res) => {
  githubQlService
    .req()
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
});

module.exports = router;
