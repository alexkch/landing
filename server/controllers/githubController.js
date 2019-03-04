const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const { githubService, githubQlService } = require('../services');

router.get('/contributor', (req, res, next) => {
  githubService
    .contributors(req.query)
    .then(result => {
      if (result) return res.send(result);
      next({
        status: HttpStatus.NOT_FOUND,
        log: '[GET] /github/contributor => Contributor not found'
      });
    })
    .catch(err =>
      next({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        log: `[POST GRAPHQL] /github/all => ${err}`
      })
    );
});

router.get('/all', (req, res, next) => {
  githubQlService
    .req()
    .then(result => {
      if (result) return res.send(result);
      next({
        status: HttpStatus.NOT_FOUND,
        log: '[POST GRAPHQL] /github/all => GraphQL Query not found'
      });
    })
    .catch(err =>
      next({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        log: `[POST GRAPHQL] /github/all => ${err}`
      })
    );
});

module.exports = router;
