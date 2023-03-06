const { User } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });
  return user;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  return user;
}; 

const getByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
}; 

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
  return null;
};

module.exports = {
  login,
  getById,
  getByEmail,
  createUser,
  getAll,
  deleteUser,
};
