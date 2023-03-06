const BlogPostService = require('../services/post.service');
const categoryService = require('../services/category.service');
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = require('../utils/statusCodes');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  if (!title || !content || !categoryIds) {
    return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
  }

  const getCategories = await Promise.all(categoryIds
    .map(async (catId) => categoryService.getById(catId)));

  if (getCategories.includes(null)) {
    return res.status(BAD_REQUEST).json({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = await BlogPostService.createPost(req.body, id);

  res.status(CREATED).json(newPost.dataValues);

  await Promise.all(categoryIds
    .map(async (catId) => BlogPostService.createLink(newPost.dataValues.id, catId)));
};

const getAll = async (_req, res) => {
  const posts = await BlogPostService.getAll();

  res.status(OK).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const post = await BlogPostService.getById(+id);

  if (!post) {
    return res.status(NOT_FOUND).json({ message: 'Post does not exist' });
  }

  res.status(OK).json(post);
};

module.exports = {
  createPost,
  getAll,
  getById,
};