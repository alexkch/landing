const { Project } = require('../db/models');
const router = require('express').Router();
const { validateMid } = require('../middleware');
const { mongoCloudService } = require('../services');

router.get('/all', (req, res) => {
  Project.find()
    .select('-__v')
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

router.get('/graph-all', (req, res) => {
  mongoCloudService
    .getAll(Project)
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => console.log(err));
});

router.get('/:id', [validateMid], (req, res, next) => {
  Project.findById(req.params.id)
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
});

router.post('/graph-post', (req, res) => {
  mongoCloudService
    .postToModel(Project, req.body)
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  new Project(req.body)
    .save()
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

router.patch('/:id', [validateMid], (req, res) => {
  Project.update({ _id: req.params.id }, req.body).then(result => {
    if (result) return res.send(result);
  });
});

router.delete('/:id', [validateMid], (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
});

module.exports = router;
