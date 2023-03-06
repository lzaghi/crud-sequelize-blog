const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAll = async () => {
  const users = await Category.findAll();
  return users;
};

module.exports = {
  createCategory,
  getAll,
};