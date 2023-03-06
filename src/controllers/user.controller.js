const jwt = require('jsonwebtoken');
const { validateCredentials } = require('../utils/validateCredentials.js');
const userService = require('../services/user.service.js');
const { OK, BAD_REQUEST, CREATED, CONFLICT, NOT_FOUND } = require('../utils/statusCodes.js');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login(email, password);
  
  if (!user) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  res.status(OK).send({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const { error } = validateCredentials(req.body);
  if (error) return res.status(BAD_REQUEST).json({ message: error.message });

  const usedEmail = await userService.getByEmail(email);
  if (usedEmail) {
    return res.status(CONFLICT).json({ message: 'User already registered' });
  }

  const newUser = await userService.createUser(displayName, email, password, image);
  const newUserId = newUser.dataValues.id;

  const token = jwt.sign({ data: { userId: newUserId } }, secret, jwtConfig);

  res.status(CREATED).send({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();

  const filteredUsers = users.map((user) => {
    const { password: _, ...rest } = user.dataValues;
    return rest;
  });

  res.status(OK).json(filteredUsers);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(+id);

  if (!user) {
    return res.status(NOT_FOUND).json({ message: 'User does not exist' });
  }

  const { password: _, ...filteredUser } = user.dataValues;

  res.status(OK).json(filteredUser);
};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
};