const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAll = async () => {
  const users = await Category.findAll();
  return users;
};

const getById = async (id) => {
  const category = await Category.findOne({
    where: { id },
  });
  return category;
};

module.exports = {
  createCategory,
  getAll,
  getById,
};