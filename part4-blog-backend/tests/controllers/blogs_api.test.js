const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const Blog = require('../../models/blog');
const blogsRouter = require('../../controllers/blogs_api');

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

describe('fetching blogs', () => {
  test('return all blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('blogs schema', () => {
  test('the unique identifier property of the blog posts is named id', async () => {
    const apiResult = await api.get('/api/blogs');

    const blogs = JSON.parse(apiResult.text);

    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined;
    });
  });
});

describe('saving blogs', () => {
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

  test('saving a blog without title should return 400', async () => {
    const newBlog = {
      author: 'MMANSON',
      url: 'mmanson.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('saving a blog without url should return 400', async () => {
    const newBlog = {
      title: 'test',
      author: 'MMANSON',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('deleting blogs', () => {
  test('deleting a blog works', async () => {
    const savedBlogs = await Blog.find({});

    const blogToDelete = savedBlogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });
  test('deleting a blog that does not exist', async () => {
    await api.delete(`/api/blogs/fakeId}`).expect(400);
  });
});
