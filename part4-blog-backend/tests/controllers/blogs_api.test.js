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

test('the unique identifier property of the blog posts is named id', async () => {
  const apiResult = await api.get('/api/blogs');

  const blogs = JSON.parse(apiResult.text);

  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined;
  });
});

test('saving a new blog', async () => {
  const newBlog = {
    title: 'TSAONGAF',
    author: 'MMANSON',
    url: 'mmanson.com',
    likes: 100,
  };

  await api.post('/api/blogs').send(newBlog).expect(201);

  const savedBlogs = await Blog.find({ title: 'TSAONGAF' });

  expect(savedBlogs).toHaveLength(1);
  expect(savedBlogs[0]).toMatchObject(newBlog);
});

test('saving a blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'TSAONGAF',
    author: 'MMANSON',
    url: 'mmanson.com',
  };

  await api.post('/api/blogs').send(newBlog).expect(201);

  const savedBlogs = await Blog.find({ title: 'TSAONGAF' });

  expect(savedBlogs).toHaveLength(1);
  expect(savedBlogs[0].likes).toEqual(0);
});
