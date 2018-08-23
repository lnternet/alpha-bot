var express = require('express');
var app = express();
app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});

app.get('/name', function(req, res) {
  res.send('John Cena\n');
});

app.listen(3001);
console.log('Listening on port 3001...');
