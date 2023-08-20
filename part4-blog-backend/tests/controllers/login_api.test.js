const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../app');
const User = require('../../models/user');
const helper = require('../test_utils/test_helper.js');

const api = supertest(app);

describe('login', () => {
  beforeEach(async () => {
    await helper.initDefaultUser;
  });

  test('login works', async () => {
    const credentials = {
      username: 'test',
      password: 'test',
    };

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.username).toEqual(credentials.username);
    expect(response.body.token).not.toBeUndefined();
  });

  test('login does not work with false username', async () => {
    const credentials = {
      username: 'fakeUsername',
      password: 'sekret',
    };

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('login does not work with false password', async () => {
    const credentials = {
      username: 'root',
      password: 'falsePassword',
    };

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});
