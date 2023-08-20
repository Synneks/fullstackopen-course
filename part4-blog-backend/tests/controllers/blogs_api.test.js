const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const Blog = require('../../models/blog');
const helper = require('./../test_utils/test_helper');

const api = supertest(app);

beforeEach(async () => {
  const user = await helper.initDefaultUser();
  await Blog.deleteMany({});
  await helper.initDefaultBlogsToUser(user);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('fetching blogs', () => {
  test('return all blogs as json', async () => {
    const token = await helper.createTokenForUser('test');

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(await Blog.count({}));
  });
});

describe('blogs schema', () => {
  test('the unique identifier property of the blog posts is named id', async () => {
    const token = await helper.createTokenForUser('test');
    const apiResult = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);

    const blogs = JSON.parse(apiResult.text);

    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined;
    });
  });
});

describe('saving blogs', () => {
  test('saving a new blog', async () => {
    const token = await helper.createTokenForUser('test');

    const newBlog = {
      title: 'TSAONGAF',
      author: 'MMANSON',
      url: 'mmanson.com',
      likes: 100,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const savedBlogs = await Blog.find({ title: 'TSAONGAF' });

    expect(savedBlogs).toHaveLength(1);
    expect(savedBlogs[0]).toMatchObject(newBlog);
  });

  test('saving a blog without likes defaults to 0', async () => {
    const token = await helper.createTokenForUser('test');
    const newBlog = {
      title: 'TSAONGAF',
      author: 'MMANSON',
      url: 'mmanson.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const savedBlogs = await Blog.find({ title: 'TSAONGAF' });

    expect(savedBlogs).toHaveLength(1);
    expect(savedBlogs[0].likes).toEqual(0);
  });

  test('saving a blog without title should return 400', async () => {
    const token = await helper.createTokenForUser('test');
    const newBlog = {
      author: 'MMANSON',
      url: 'mmanson.com',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('saving a blog without url should return 400', async () => {
    const token = await helper.createTokenForUser('test');
    const newBlog = {
      title: 'test',
      author: 'MMANSON',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('deleting blogs', () => {
  test('deleting a blog works', async () => {
    const token = await helper.createTokenForUser('test');
    const savedBlogs = await Blog.find({});
    const blogToDelete = savedBlogs[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
  test('deleting a blog that does not exist', async () => {
    const token = await helper.createTokenForUser('test');
    await api
      .delete(`/api/blogs/fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('updating blogs', () => {
  test('updating a blog works', async () => {
    const token = await helper.createTokenForUser('test');
    const savedBlogs = await Blog.find({});
    const blogToUpdateObject = savedBlogs[0];
    const blogToUpdate = blogToUpdateObject.toJSON();
    blogToUpdate.title = 'updated Title';
    blogToUpdate.author = 'udpated Author';

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const updatedBlogObject = await Blog.findById(blogToUpdate.id);
    const updatedBlog = updatedBlogObject?.toJSON();
    expect(updatedBlog).not.toBeNull();
    expect(updatedBlog?.title).toEqual(blogToUpdate.title);
    expect(updatedBlog?.author).toEqual(blogToUpdate.author);
  });
});
