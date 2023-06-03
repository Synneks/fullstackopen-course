const { Error } = require('mongoose');

const dummy = (array) => array.length;

const totalLikes = (blogList) =>
  blogList.reduce((count, blog) => count + blog.likes, 0);

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) {
    throw new Error('list of favorite blogs cannot be empty');
  }

  let currentFavoriteBlog = blogList[0];

  blogList.forEach((blog) => {
    if (blog.likes > currentFavoriteBlog.likes) currentFavoriteBlog = blog;
  });
  return currentFavoriteBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog };
