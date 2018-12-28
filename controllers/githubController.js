const { githubService } = require('../services');

exports.allRepoDetails = (req, res) => {
  githubService
    .repos()
    .then(result => res.send(result))
    .catch(err => console.log(err));
};
