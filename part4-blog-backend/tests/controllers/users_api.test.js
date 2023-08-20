const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../app');
const User = require('../../models/user');
const helper = require('../test_utils/test_helper');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await helper.initDefaultUser;
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'newUser',
      name: 'New User',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with same username', async () => {
    const usersAtStart = await helper.usersInDb();

    await api.post('/api/users').send(usersAtStart[0]).expect(400);
  });

  test('creation fails with short username', async () => {
    const newUser = {
      username: '12',
      name: '',
      password: '12',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });
});
