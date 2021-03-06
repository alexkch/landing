const { Project } = require('../db/models');
const router = require('express').Router();
const { validateMid } = require('../middleware');

router.get('/test', (req, res) => {
  res.send('success').status(200);
});

router.post('/test2', (req, res) => {
  res.send('success').status(200);
});

router.get('/all', (req, res) => {
  Project.find()
    .select('-__v')
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

router.get('/graph-all', (req, res) => {
  Project.find()
    .select('-__v')
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
  new Project(body)
    .save()
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
