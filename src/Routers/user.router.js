const express = require('express');
const userController = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', validateToken, userController.getAll);
router.get('/:id', validateToken, userController.getById);

module.exports = router;