var express = require('express');
var app = express();

var Event = require('../model/event');

var bodyParser = require('body-parser');
var MongoService = require('../mongoService');

var mongoService = new MongoService();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Hello User!!!");
})

app.get('/rooms', function (req, res) {
  mongoService.getRooms()
    .then((rooms) => {
      res.send(rooms)
    })
    .catch((error) => {
      res.send(error)
    })
})

app.get('/room/:roomName', function (req, res) {
  var roomName = req.params.roomName;
  mongoService.getRoom(roomName)
    .then((room) => {
      res.send(room)
    })
    .catch((error) => {
      res.send(error)
    })
})

app.get('/room/:roomName/events', function (req, res) { //GET events by ROOM
  var roomName = req.params.roomName;
  mongoService.getRoomEvents(roomName)
    .then((events) => {
      if (events.length >= 1) {
        res.send(events);
      } else {
        res.send(`No Events for: ${roomName}`);
      }
    })
    .catch((error) => {
      res.send(error);
    })
});

app.get('/events/:userId', function (req, res) { //GET events by UserId
  var userId = req.params.userId;
  mongoService.getMyEvents(userId)
    .then((events) => {
      if (events.length>=1) {
        res.send(events);
      } else {
        res.send(`No Events for: ${userId}`);
      }
    })
    .catch((error) => {
      res.send(error);
    })
});

app.delete('/user/:userId/events/startingTime/:startsAt', function (req, res) { //DELETE event by userId and starting time
  var userId = req.params.userId;
  var startingTime = req.params.startsAt;

  mongoService.deleteEvent(userId, startingTime)
    .then((deletedEvent) => {
      if (deletedEvent) {
        res.send(`${deletedEvent.title} :Event Deleted`);
      } else {
        res.send(`No Matching Events for: ${userId} and ${startingTime}`);
      }
    })
    .catch((error) => {
      console.log("Error", error);
    })

});

app.post('/events', function (req, res) { //POST request For event
  var event = new Event(req.body);
  mongoService.createEvent(event)
    .then((createdEvent) => {
      res.send(createdEvent);
    })
    .catch((error) => {
      res.send(`Room is already booked for slot ${event.startsAt} to ${event.endsAt}.`);
    })
});


app.listen(3000, "localhost", function () {
  console.log("app is listening on port: 3000");
})