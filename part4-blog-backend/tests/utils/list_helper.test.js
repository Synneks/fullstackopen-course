const listHelper = require('../../utils/list_helper');

describe('dummy', () => {
  test('of array with one value', () => {
    const result = listHelper.dummy([2]);
    expect(result).toBe(1);
  });

  test('of array with no value', () => {
    const result = listHelper.dummy([]);
    expect(result).toBe(0);
  });
});

describe('totalLikes', () => {
  test('of empty array', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('of array with 3 blogs, each with 2 likes', () => {
    const blogsList = [
      { name: 'test', likes: 2 },
      { name: 'test2', likes: 2 },
      { name: 'test3', likes: 2 },
    ];
    const result = listHelper.totalLikes(blogsList);
    expect(result).toBe(6);
  });
});

describe('favoriteBlog', () => {
  test('should throw error for empty array', () => {
    expect(() => listHelper.favoriteBlog([])).toThrow(
      'list of blogs cannot be empty'
    );
  });

  test('of array with 3 blogs', () => {
    const blogsList = [
      { name: 'test', likes: 2 },
      { name: 'test2', likes: 3 },
      { name: 'test3', likes: 1 },
    ];
    const result = listHelper.favoriteBlog(blogsList);
    expect(result).toEqual({ name: 'test2', likes: 3 });
  });
});

describe('mostBlogs', () => {
  test('should throw error for empty array', () => {
    expect(() => listHelper.mostBlogs([])).toThrow(
      'list of blogs cannot be empty'
    );
  });

  test('of array with 3 blogs, 2 different authors', () => {
    const blogsList = [
      { author: 'test' },
      { author: 'test2' },
      { author: 'test2' },
    ];
    const result = listHelper.mostBlogs(blogsList);
    expect(result).toEqual({ author: 'test2', blogs: 2 });
  });
});

describe('mostLikes', () => {
  test('should throw error for empty array', () => {
    expect(() => listHelper.mostBlogs([])).toThrow(
      'list of blogs cannot be empty'
    );
  });

  test('of array with 3 blogs, 2 different authors', () => {
    const blogsList = [
      { author: 'test', likes: 3 },
      { author: 'test2', likes: 1 },
      { author: 'test2', likes: 1 },
    ];
    const result = listHelper.mostLikes(blogsList);
    expect(result).toEqual({ author: 'test', totalLikes: 3 });
  });
});
