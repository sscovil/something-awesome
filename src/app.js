require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;

app.post('/api/forms/contact', bodyParser.urlencoded({extended: true}), function(req, res) {
  console.log(req.body);
  res.sendStatus(204);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
  console.log(`Server is listening on port ${port}!`);
});
