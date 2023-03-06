const express = require('express');
const postController = require('../controllers/post.controller');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateToken, postController.createPost);
router.get('/', validateToken, postController.getAll);
router.get('/:id', validateToken, postController.getById);
router.put('/:id', validateToken, postController.updatePost);

module.exports = router;