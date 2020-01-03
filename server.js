const express = require('express');
const path = require('path');
const app = express();

const port = 3000;


//Default path
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(express.static(path.join(__dirname + '/src')));

//App Start
app.listen(port, () => console.log(`Example app listening on port ${port}!`))