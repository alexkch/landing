const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Project {
        _id: String!
        title: String!
    }

    type RootQuery {
        project(id: String!): Project!
        projects: [Project!]!
    }

    schema {
        query: RootQuery
    }`);
