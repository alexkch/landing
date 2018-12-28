const request = require('request-promise-native');
const { replaceString } = require('../utils');
const { base, user, endpoint } = require('config').get('githubServiceConfig');

exports.repos = options =>
  request({
    method: 'GET',
    url: replaceString(`${base}${endpoint.repos}`, { user: user }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });

exports.lang = options =>
  request({
    method: 'GET',
    url: replaceString(`${base}${endpoint.lang}`, {
      user: user,
      repo: options.repo
    }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
