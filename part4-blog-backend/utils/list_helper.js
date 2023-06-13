const { Error } = require('mongoose');

const dummy = (array) => array.length;

const totalLikes = (blogList) =>
  blogList.reduce((count, blog) => count + blog.likes, 0);

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) {
    throw new Error('list of blogs cannot be empty');
  }

  let currentFavoriteBlog = blogList[0];

  blogList.forEach((blog) => {
    if (blog.likes > currentFavoriteBlog.likes) currentFavoriteBlog = blog;
  });
  return currentFavoriteBlog;
};

const mostBlogs = (blogList) => {
  if (blogList.length === 0) {
    throw new Error('list of blogs cannot be empty');
  }
  const authorsMap = new Map();
  blogList.forEach((blog) => {
    if (authorsMap.has(blog.author)) {
      authorsMap.set(blog.author, [...authorsMap.get(blog.author), blog]);
    } else {
      authorsMap.set(blog.author, [blog]);
    }
  });

  let currentBiggestAuthor = {
    author: blogList[0].author,
    blogs: authorsMap.get(blogList[0].author).length,
  };

  authorsMap.forEach((authorBlogList, author) => {
    if (authorBlogList.length > currentBiggestAuthor.blogs) {
      currentBiggestAuthor = { author, blogs: authorBlogList.length };
    }
  });

  return currentBiggestAuthor;
};

const mostLikes = (blogList) => {
  if (blogList.length === 0) {
    throw new Error('list of blogs cannot be empty');
  }

  const authorsMap = [
    ...blogList.reduce(
      (map, blog) =>
        map.set(blog.author, (map.get(blog.author) || 0) + blog.likes),
      new Map()
    ),
  ];

  return authorsMap.reduce(
    (currentMostLikedAuthor, [author, likes]) =>
      likes > currentMostLikedAuthor.totalLikes
        ? { author, totalLikes: likes }
        : currentMostLikedAuthor,
    { author: blogList[0].author, totalLikes: 0 }
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
