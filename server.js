var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');





//*********** Server setup ************

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('files'));
app.use('/static', express.static('files'));





//********* Endpoints ***********
app.get('/test', function(req, res) {
  console.log('Request received to GET test');
  res.status(200).send('Hi!');
});


app.post('/upload_result', function(req, res) {
  console.log('Request received to upload result', req.body);
  var room = req.body.room;
  var detectedPeople = req.body.detectedPeople;

  switch(room.toLowerCase())
  {
    case 'gaming room':
    case 'canteen':
      setNumberOfPeople(room, detectedPeople);
      break;
    default:
      res.status(500).send('Room not recognized. Try again...');
  }

  res.status(200).send('Done!');
});


app.post('/status', function(req, res) {
  console.log('Request received to POST status. Body: ', req.body);
  var room = req.body.text.toLowerCase();

  switch(room)
  {
    case "gaming room":
    case "canteen":
      var peopleNr = getNumberOfPeople(room);
      res.status(200).send({
        "response_type": "in_channel",
        "text": "Current room status:",
        "attachments": [
          {
            "color": getStatusColor(peopleNr),
            "text": `There are ${peopleNr} people in ${room} at the moment.`,
            "image_url": getImageUrl(room)
          }
        ]
      });
      break;
    default:
        res.status(500).send('Room not recognized. Try again...');
  }
});

//*********************************

app.listen(port, function () {
 console.log('Server started...');
});

function getStatusColor(peopleNr) {
  if(peopleNr >= 10) return 'danger';
  return 'good';
}

function getNumberOfPeople(room) {
  let file = null;
  switch(room)
  {
    case 'gaming room':
      file = path.resolve(__dirname, 'files/groom.txt');
      break;
    case 'canteen':
      file = path.resolve(__dirname, 'files/canteen.txt');
      break;
  }

  let result = '0';
  if(file != null) {
    result = fs.readFileSync(file, 'utf8');
  }

  return parseInt(result);
}

function setNumberOfPeople(room, nr) {
  let file = null;
  switch(room)
  {
    case 'gaming room':
      file = path.resolve(__dirname, 'files/groom.txt');
      break;
    case 'canteen':
      file = path.resolve(__dirname, 'files/canteen.txt');
      break;
  }

  if(file != null) {
    fs.writeFileSync(file, nr);
  }
}

function getImageUrl(room) {
  switch(room){
    case 'gaming room': return 'https://alpha-db-app.herokuapp.com/static/groom.jpg';
    case 'canteen': return 'https://alpha-db-app.herokuapp.com/static/canteen.jpg';
    default: return '';
  }
}
