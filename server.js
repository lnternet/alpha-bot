var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});
app.get('/name', function (req, res) {
  console.log('Request received:', req);
 res.send('go away');
});
app.listen(port, function () {
 console.log('Example app listening on port !');
});
