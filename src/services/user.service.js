const { User } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
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

module.exports = {
  login,
  getByEmail,
  createUser,
};
