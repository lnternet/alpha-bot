var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');





//*********** Server setup ************

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('files'));
app.use('/static', express.static('files'));





//********* Endpoints ***********

app.post('/upload_result', function(req, res) {
  console.log('Request received to upload result', req.body);
  var room = req.body.room;

  switch(room.toLowerCase())
  {
    case 'gaming room':
    //Get image
    //Save image as groom.png
    //Get text
    //Save text
      break;
    case 'canteen':
      break;
    default:
      res.send('Room not recognized. Try again...');
  }
});


app.post('/status', function(req, res) {
  console.log('Request received to POST status. Body: ', req.body);
  var room = req.body.text.toLowerCase();

  switch(room)
  {
    case "gaming room":
    case "canteen":
      var peopleNr = getNumberOfPeople(room);
      res.send({
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
        res.send('Room not recognized. Try again...');
  }
});

//*********************************

app.listen(port, function () {
 console.log('Server started...');
});

function getStatusColor(peopleNr) {
  return 'good';
}

function getNumberOfPeople(room) {
  let file = null;
  switch(room)
  {
    case 'gaming room':
      file = 'static/groom.txt';
      break;
    case 'canteen':
      file = 'static/canteen.txt'
      break;
  }

  if(file != null) {
    var result = fs.readFile('static/canteen.txt','utf8', function(error, content) {
      if(content !== null)
        result = parseInt(content);
    });
    return result;
  }
  return 0;
}

function getImageUrl(room) {
  return 'https://alpha-db-app.herokuapp.com/static/canteen.jpg';
}
