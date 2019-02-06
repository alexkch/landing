const express = require('express');
const graphqlHttp = require('express-graphql');
const {
  projectController,
  googleApiController,
  githubController,
  pipelineController
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
  app.use('/gapi', googleApiController);
  app.use('/project', projectController);
  app.use('/github', githubController);
  app.use('/pipeline', pipelineController);
  app.use(error);
};
