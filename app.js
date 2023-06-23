require('dotenv/config');
require('./db');
const express = require('express');
const hbs = require('hbs');
const app = express();
require('./config')(app);
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// Import the authentication middleware and views
const authMiddleware = require('./middlewares/authMiddleware');
const mainPage = require('./views/main');
const privatePage = require('./views/private');

// Define protected routes with authentication middleware
app.get('/main', authMiddleware, (req, res) => {
  res.send(mainPage);
});

app.get('/private', authMiddleware, (req, res) => {
  res.send(privatePage);
});

const index = require('./routes/index');
app.use('/', index);
require('./error-handling')(app);

module.exports = app;
