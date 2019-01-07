const { GraphQLClient } = require('graphql-request');
const { base, endpoint } = require('config').get('githubServiceConfig');
const { githubService } = require('../config/credentials');

const client = new GraphQLClient(`${base}${endpoint.graphql}`, {
  headers: {
    Authorization: `bearer ${githubService.token}`
  }
});
const query = `query {
  repository(owner:"alexkch", name:"TeenSrv") {
    createdAt
    pushedAt
    updatedAt
    description
    forkCount
    sshUrl
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          id
          history(first: 20) {
            edges {
              node {
                committedDate
                message
                messageBody
                messageHeadline
                author {
                  name
                  email
                  date
                }
              }
            }
          }
        }
      }
    }
    languages(last:10) {
      edges {
        node {
          name
        }
        size
      }
      totalSize
    }
    stargazers{
      totalCount
    }
    watchers{
      totalCount
    }
  }
}`;

const variables = {
  title: 'Inception'
};

exports.req = options => client.request(query);
