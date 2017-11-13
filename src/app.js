'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mailer = require('./mailer');
const middleware = require('./middleware');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const pages = [
  {
    id: 'about',
    title: 'About',
    path: '/about',
    linkText: 'About',
    content: `<p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut posuere lectus. Morbi iaculis pellentesque auctor. Quisque laoreet imperdiet congue. Curabitur vestibulum feugiat cursus. Praesent eget iaculis nunc, ut pulvinar felis. Donec faucibus elementum
          sapien non egestas. Mauris ultrices auctor lacus quis auctor.
        </p>
        <p>
          Mauris sed dui tortor. Aliquam faucibus interdum nulla, et hendrerit nisl pulvinar sit amet. Maecenas a metus sapien. Mauris eget nulla vulputate, porttitor erat vitae, sagittis dolor. Vestibulum tincidunt nunc sed nunc dapibus ullamcorper. Nunc et mattis
          sapien. Nam maximus metus nec odio feugiat ultrices. Nullam a ex erat. Maecenas imperdiet tellus massa, sed luctus quam consequat eu. Mauris vulputate nisi ac congue blandit. Nam eu congue erat. Etiam varius interdum felis venenatis mattis.
          Maecenas neque turpis, dapibus in facilisis sit amet, iaculis eu nulla.
        </p>
        <p>
          Sed vulputate sapien ligula, egestas tristique ipsum venenatis eu. Donec leo augue, auctor vitae arcu hendrerit, volutpat condimentum felis. Nullam blandit malesuada mauris sit amet sagittis. Praesent mollis tincidunt ultrices. Nunc nisl risus, euismod
          pretium vestibulum euismod, gravida nec lectus. Vivamus ut velit nibh. Donec ac elit eu mi eleifend cursus. Nam at rutrum massa. Nunc in mauris tincidunt, ultricies ligula quis, rutrum diam. Praesent feugiat, nunc a commodo bibendum, tellus
          tellus auctor tortor, vitae mollis sem magna ac sapien. Praesent imperdiet lectus sit amet libero tempus, vel porttitor arcu faucibus. Vestibulum ac augue eget urna tristique fringilla. Phasellus at lectus varius, aliquam neque et, laoreet
          quam. Nunc non dolor sed arcu pharetra posuere at vitae felis.
        </p>
        <p>
          Phasellus sed laoreet est. Nunc semper, nibh eget luctus cursus, libero orci venenatis ipsum, at accumsan nisi mauris eu nisl. Etiam eget augue a felis interdum placerat. Etiam sed magna ac magna elementum fringilla venenatis ornare velit. Nulla eu tortor
          in urna pulvinar pretium quis et tellus. Donec quis facilisis leo. Cras mollis dictum fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sed mi ut dolor sodales convallis. Quisque maximus bibendum porttitor. In sed
          libero tempus, pharetra nunc in, vehicula felis. Pellentesque in neque sed neque pharetra ultricies. Donec scelerisque ipsum eu leo vehicula, nec facilisis sem laoreet. Nunc aliquam vitae sapien vitae aliquam. Cras a eros rutrum, elementum
          nulla at, dictum elit. Integer in quam vitae dolor gravida interdum.
        </p>`
  },
  {
    id: 'contact',
    title: 'Contact Us!',
    path: '/contact',
    linkText: 'Contact',
    content: `<form method="POST" action="/api/forms/contact">
              <label for="name">Name: <span class="required">*</span></label>
              <input id="name" name="name" value="" placeholder="Jimmy Choo" autofocus required/>

              <label for="email">Email Address: <span class="required">*</span></label>
              <input type="email" id="email" name="email" value="" placeholder="jchoo62@example.com" required/>

              <label for="subject">Subject: <span class="required">*</span></label>
              <input id="subject" name="subject"/>

              <label for="message">Message: <span class="required">*</span></label>
              <textarea id="message" name="message" placeholder="Your message must be greater than 30 characters" data-minlength="30" required></textarea>

              <input type="submit" value="Submit"/>
              <p id="req-field-desc"><span class="required">*</span> indicates a required field</p>
            </form>`
  }
];
const posts = [
  {
    id: 1,
    title: 'My First Post',
    content: `<p>
      Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud</p>`
  },
  {
    id: 2,
    title: 'My Second Post',
    content: `<p>
    Wick wick wick wick Wick wick wick wick Wick wick wick wick Wick wick wick wick Wick wick wick wick Wick wick</p>`
  }
];

Object.assign(app.locals, {
  meta: {
    title: 'My Blog',
    description: 'A blog about something awesome!'
  },
  header: {
    title: 'Something Awesome'
  },
  footer: {
    year: new Date().getFullYear()
  },
  pages: pages
});

app.use(middleware.currentPath);

app.get('/', function(req, res) {

  res.render('index', {
    posts: posts
  });

});

app.get('/posts/:id', function(req, res) {
  const post = posts.find(function (post) {
    return post.id === Number(req.params.id)
  });

  if (post) {res.render('post', {
    post: post,
    header: {
      title: post.title
    }
  });
  }

  return res.sendStatus(404);
});

app.get('/:pageId', function(req, res) {
  const page = pages.find(function(page) {
    return page.id === req.params.pageId;
  });

  if (page) {
    return res.render('page', {
      page: page,
      header: {
        title: page.title
      }
    });
  }

  return res.sendStatus(404);
});

app.post('/api/forms/contact', bodyParser.urlencoded({ extended: true }), middleware.saveContactFormData, function(req, res) {
  try {
    const to = mailer.ADMIN_EMAIL;
    const from = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    mailer.sendText(to, from, subject, message, function(err, body) {
      if (err) {
        console.log(err);
        return res.status(400).send(err.message);
      }
      console.log(body);
      return res.sendStatus(204);
    });
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});


app.use('/css', express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
  console.log(`Server is listening on port ${port}!`);
});
