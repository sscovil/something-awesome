const express = require('express');
const path = require('path');
const app = express();

app.get('/', function (req, res) {
     res.send('Hello World!')
})

app.listen(3000, function() {
     console.log('Example app listening on port 3000!')
})
app.use(express.static(path(__dirname, 'public')));
