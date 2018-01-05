'use strict';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pages').del()
    .then(function () {
      // Inserts seed entries
      return knex('pages').insert([
        {
          id: 'about',
          path: '/about',
          linkText: 'About',
          title: 'About',
          content: `<p>Edit this page to tell people about your blog!</p>`
        },
        {
          id: 'contact',
          path: '/contact',
          linkText: 'Contact',
          title: 'Contact Us!',
          content: `<form method="POST" action="/forms/contact">
  <label for="name">Name: <span class="required">*</span></label>
  <input id="name" name="name" value="" placeholder="Jimmy Choo" autofocus required/>

  <label for="email">Email Address: <span class="required">*</span></label>
  <input type="email" id="email" name="email" value="" placeholder="jchoo62@example.com" required/>

  <label for="subject">Subject: <span class="required">*</span></label>
  <input id="subject" name="subject"/>

  <label for="message">Message: <span class="required">*</span></label>
  <textarea id="message" name="message" placeholder="Your message must contain at least 30 characters." data-minlength="30" required></textarea>

  <input type="submit" value="Submit"/>
  <p id="req-field-desc"><span class="required">*</span> indicates a required field</p>
</form>`
        },
      ]);
    });
};
