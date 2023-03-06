const { BlogPost, PostCategory } = require('../models');

const createPost = async ({ title, content }, userId) => {
  const newPost = await BlogPost.create({ title, content, userId });
  return newPost;
};

const createLink = async (postId, categoryId) => {
  const newLink = await PostCategory.create({ postId, categoryId });
  return newLink;
};

module.exports = {
  createPost,
  createLink,
};