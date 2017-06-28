const express = require('express')
const app = express()

app.get('/', function (req, res) {
     res.send('Hello World!')
})

app.listen(3000, function() {
     console.log('Example app listening on port 3000!')
})

app.use(express.static('/public'))
app.use(express.static('/files'))
app.use(express.static(__dirname, { index: 'index.html' }));
