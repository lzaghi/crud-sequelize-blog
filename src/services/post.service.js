const { Op } = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const { User, Category } = require('../models');

const createPost = async ({ title, content }, userId) => {
  const newPost = await BlogPost.create({ title, content, userId });
  return newPost;
};

const createLink = async (postId, categoryId) => {
  const newLink = await PostCategory.create({ postId, categoryId });
  return newLink;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePost = async (post, id) => {
  const updatedPost = await BlogPost.update(post, {
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return updatedPost;
};

const deletePost = async (id) => {
  await BlogPost.destroy({
    where: { id },
  });
  return null;
};

const getByQuery = async (q) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = {
  createPost,
  createLink,
  getAll,
  getById,
  updatePost,
  deletePost,
  getByQuery,
};