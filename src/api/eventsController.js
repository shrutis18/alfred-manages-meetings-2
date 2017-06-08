var express = require('express');
var app = express();

var Operations = require('../operations');

var operations = new Operations();

app.get('/',function(req,res){
  res.send("Hello User!!!");
})

app.get('/events/:roomName',function(req,res){
  var roomName = req.params.roomName;
  operations.getRoomEvents(roomName)
    .then((events) => {
      if(events.length >= 1)
      res.send(events);
      res.send(`No Events for: ${roomName}`);
    })
    .catch((error) => {
      res.send(error);
    })
});

app.listen(3000,"localhost",function(){
  console.log("app is listening on port: 3000");
})
