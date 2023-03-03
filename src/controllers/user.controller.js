const jwt = require('jsonwebtoken');
const { validateCredentials } = require('../middlewares/createUser.middleware.js');
const userService = require('../services/user.service.js');
const { OK, BAD_REQUEST, CREATED, CONFLICT } = require('../utils/statusCodes.js');

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

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const { error } = validateCredentials(req.body);
  if (error) return res.status(BAD_REQUEST).send({ message: error.message });

  const usedEmail = await userService.getByEmail(email);
  if (usedEmail) {
    return res.status(CONFLICT).send({ message: 'User already registered' });
  }

  const newUser = await userService.createUser(displayName, email, password, image);
  const newUserId = newUser.dataValues.id;

  const token = jwt.sign({ data: { userId: newUserId } }, secret, jwtConfig);

  res.status(CREATED).send({ token });
};

module.exports = {
  login,
  createUser,
};