const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controller/blogs');

const app = express();

const mongoUrl =
  'mongodb+srv://synneks:synneks@cluster0.3mzik.mongodb.net/fullstackopen-blog?retryWrites=true&w=majority';
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
