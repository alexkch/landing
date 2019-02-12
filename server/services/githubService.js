const request = require('request-promise-native');
const { replaceString } = require('../utils');
const { base, user, endpoint } = require('config').get('githubServiceConfig');

exports.contributors = options =>
  request({
    method: 'GET',
    url: replaceString(`${base}${endpoint.contributors}`, {
      user: user,
      repo: options.repo
    }),
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json'
    },
    json: true
  });
