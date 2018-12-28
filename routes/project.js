const router = require('express').Router();

const { projectController } = require('../controllers');
const { validateMid } = require('../middleware');

router.get('/all', projectController.getProjects);
router.get('/:id', [validateMid], projectController.getProject);
router.post('/', projectController.createProject);
router.patch('/:id', [validateMid], projectController.updateProject);
router.delete('/:id', [validateMid], projectController.deleteProject);

module.exports = router;
