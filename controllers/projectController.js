const { Project } = require('../db/models');

exports.getProjects = (req, res) => {
  Project.find()
    .select('-__v')
    .then(result => res.send(result))
    .catch(err => console.log(err));
};

exports.getProject = (req, res, next) => {
  Project.findById(req.params.id)
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
};

exports.createProject = (req, res) => {
  new Project(req.body)
    .save()
    .then(result => res.send(result))
    .catch(err => console.log(err));
};

exports.updateProject = (req, res) => {
  Project.update({ _id: req.params.id }, req.body).then(result => {
    if (result) return res.send(result);
  });
};

exports.deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
};
