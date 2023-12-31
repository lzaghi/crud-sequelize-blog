const express = require('express');
const postController = require('../controllers/post.controller');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/search', validateToken, postController.getByQuery);
router.post('/', validateToken, postController.createPost);
router.get('/', validateToken, postController.getAll);
router.get('/:id', validateToken, postController.getById);
router.put('/:id', validateToken, postController.updatePost);
router.delete('/:id', validateToken, postController.deletePost);

module.exports = router;