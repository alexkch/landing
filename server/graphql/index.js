const graphqlHttp = require('express-graphql');

module.exports = graphqlHttp({
  schema: require('./schema'),
  rootValue: require('./resolver'),
  graphiql: true
});
