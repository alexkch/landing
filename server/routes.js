const express = require('express');
const { error, log } = require('./middleware');
const graphql = require('./graphql');
const {
  projectController,
  googleApiController,
  githubController,
  notifyController
} = require('./controllers');

module.exports = app => {
  app.use(log.notifyReqLogger);
  app.use(log.apiReqLogger);
  app.use(express.json());
  app.use('/graphql', graphql);

  app.use('/', express.static(__dirname + '/views'));
  app.use('/gapi', googleApiController);
  app.use('/project', projectController);
  app.use('/github', githubController);
  app.use('/notify', notifyController);
  app.use(error);
};
