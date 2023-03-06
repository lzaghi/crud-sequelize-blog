const categoryService = require('../services/category.service');
const { BAD_REQUEST, CREATED, OK } = require('../utils/statusCodes');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }

  const newCategory = await categoryService.createCategory(name);

  res.status(CREATED).json(newCategory.dataValues);
};

const getAll = async (_req, res) => {
  const categories = await categoryService.getAll();

  res.status(OK).json(categories);
};

module.exports = {
  createCategory,
  getAll,
};