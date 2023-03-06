const express = require('express');
const userController = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', validateToken, userController.getAll);

module.exports = router;