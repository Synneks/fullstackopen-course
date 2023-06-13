const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const Blog = require('../../models/blog');

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('return all blogs as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
