const User = require('../../models/user');
const Blog = require('../../models/blog');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../../utils/config');

const createTokenForUser = async (username) => {
  const user = await User.findOne({ username });

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  return jwt.sign(userForToken, config.SECRET);
};

const initDefaultUser = async () => {
  await User.deleteMany({});
  const hashedPassword = await bcrypt.hash('test', 10);
  const user = new User({
    username: 'test',
    passwordHash: hashedPassword,
  });

  return await user.save();
};

const initDefaultBlogsToUser = async (user) => {
  const initialBlogs = [
    {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 1,
    },
    {
      title: 'second',
      author: 'second author',
      url: 'second url',
      likes: 2,
    },
  ];
  await initBlogsToUser(initialBlogs, user);
};

const initBlogsToUser = async (blogs, user) => {
  for (const blog of blogs) {
    const blogObject = new Blog({ ...blog, user: user.id });
    const savedBlog = await blogObject.save();
    user.blogs = [...user.blogs, savedBlog.id];
  }
  await user.save();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  createTokenForUser,
  initDefaultUser,
  usersInDb,
  initBlogsToUser,
  initDefaultBlogsToUser,
};
