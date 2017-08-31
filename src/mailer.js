const mailgun_secret = process.env.MAILGUN_SECRET
const api_key = mailgun_secret;
const domain = 'sandbox6eddd0f1d9eb4fddbcccea158cc97fd6.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
