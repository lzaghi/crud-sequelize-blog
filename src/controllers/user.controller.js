const jwt = require('jsonwebtoken');
const userService = require('../services/user.service.js');
const { OK, BAD_REQUEST } = require('../utils/statusCodes.js');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login(email, password);
  
  if (!user) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  res.status(OK).send({ token });
};

module.exports = {
  login,
};