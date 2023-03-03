const express = require('express');
const userController = require('../controllers/user.controller');
const { validateLoginBody } = require('../middlewares/login.middleware');

const router = express.Router();

router.post('/', validateLoginBody, userController.login);

module.exports = router;