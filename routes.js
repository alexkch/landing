const express = require('express');
const graphqlHttp = require('express-graphql');
const {
  projectController,
  googleApiController,
  githubController,
  notifyController
} = require('./controllers');
const { error } = require('./middleware');
const { schema, resolver } = require('./graphql');

module.exports = app => {
  app.use(express.json());
  app.use(
    '/graphql',
    graphqlHttp({
      schema: schema,
      rootValue: resolver,
      graphiql: true
    })
  );
  app.use('/', express.static(__dirname + '/views'));
  app.use('/gapi', googleApiController);
  app.use('/project', projectController);
  app.use('/github', githubController);
  app.use('/notify', notifyController);
  app.use(error);
};
