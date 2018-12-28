const express = require('express');
const graphqlHttp = require('express-graphql');
const projectRouter = require('./project');
const googleApiRouter = require('./googleApi');
const githubRouter = require('./github');
const { error } = require('../middleware');
const { schema, resolver } = require('../graphql');

module.exports = app => {
  app.use(express.json());
  app.use(
    '/graphql',
    graphqlHttp({
      schema: schema,
      rootValue: resolver
    })
  );
  app.use('/gapi', googleApiRouter);
  app.use('/project', projectRouter);
  app.use('/github', githubRouter);
  app.use(error);
};
