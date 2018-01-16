'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const controllers = require('./controllers');
const express = require('express');
const middleware = require('./middleware');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(middleware.locals.setDefault);

app.get('/', controllers.posts.index);
app.get('/posts/:postId', controllers.posts.getPost);
app.get('/:pageId', controllers.pages.getPage);
app.post('/forms/contact', bodyParser.urlencoded({ extended: true }), controllers.contacts.saveAndNotifyAdmin);

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Only start the server if app.js is being run directly and not being required by another module.
 */
if (require.main === module) {
  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
}

module.exports = app;
