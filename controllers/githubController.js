const { githubService, githubQlService } = require('../services');

exports.getContributors = (req, res) => {
  githubService
    .contributors(req.query)
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
};

exports.getGitInfo = (req, res) => {
  githubQlService
    .req()
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
};
