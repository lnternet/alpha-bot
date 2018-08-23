var express = require('express');
var bodyParser = require("body-parser");

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('files'));
app.use('/static', express.static('files'));

app.get('/', function (req, res) {
  res.send(JSON.stringify({ Hello: 'World'}));
});

app.get('/name', function (req, res) {
  console.log('Request received to GET name. Headers: ', req.headers);
  res.send('go away');
});

app.post('/name', function (req, res) {
  console.log('Request received to POST name. Headers: ', req.headers);
  res.send('go away');
});

app.post('/status', function(req, res) {
  console.log('Request received to POST status. Body: ', req.body);
  var receivedText = req.body.text;

  switch(receivedText.toLowerCase())
  {
    case "gaming room":
      var randomNumber = Math.floor(Math.random() * (11));
      res.send({
        "response_type": "in_channel",
        "text": "Current room status:",
        "attachments": [
          {
            "color": "good",
            "text": `There are ${randomNumber} people in ${receivedText} at the moment.`,
            "image_url": "https://alpha-db-app.herokuapp.com/static/groom.png"
          }
        ]
      });
      break;
    case "canteen":
      var randomNumber = Math.floor(Math.random() * (51));
      res.send({
        "response_type": "in_channel",
        "text": "Current room status:",
        "attachments": [
          {
            "color": "danger",
            "text": `There are ${randomNumber} people in ${receivedText} at the moment.`,
            "image_url": "https://alpha-db-app.herokuapp.com/static/canteen.jpg"
          }
        ]
      });
      break;
    default:
        res.send('Room not recognized. Try again...');
  }
});

app.listen(port, function () {
 console.log('Example app listening on port !');
});
