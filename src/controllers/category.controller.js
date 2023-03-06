const categoryService = require('../services/category.service');
const { BAD_REQUEST, CREATED } = require('../utils/statusCodes');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }

  const newCategory = await categoryService.createCategory(name);

  res.status(CREATED).json(newCategory.dataValues);
};

module.exports = {
  createCategory,
};