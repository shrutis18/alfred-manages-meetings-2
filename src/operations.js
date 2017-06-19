var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Event = require('./model/event');
var Office = require('./model/office');

function Operations() {

  var dbUrl = "mongodb://localhost/meetings";
  var conn = mongoose.connect(dbUrl);
  //mongoose.set('debug', true);
  

  function createEvent(event){
    return new Promise((resolve,reject) => {
      conn
        .then(() => {
          isAvailable(event)
            .then((events) => {
              if(events.length == 0){
                  event.save()
                      .then((event) => {
                        resolve("Room booked Successfully");
                      })
                      .catch((error) => {
                        reject(error);
                      })  
              } else{
             var err =  new Error(`Room is already booked for slot ${event.startsAt} to ${event.endsAt}.`);
            reject(err);
          }
            })
            .catch((error) => {
              console.log("could not execute find", error);
            })
        })
        .catch((error) => {
          console.log("connection failed!!",error);
        })
    })
  }

  function isAvailable(event){
    return Event.find({
      roomName: event.roomName,
      $or:[
        {
          startsAt:{$gte: event.startsAt,$lt: event.endsAt}
        },
        {
          startsAt: {$lt: event.startsAt},endsAt:{$gt:event.endsAt}
        },
        {
          endsAt:{$gt: event.startsAt, $lte:event.endsAt}
        }
      ]
    })
     
  }

  function getMyEvents(userId){
    //TODO check connection
     return Event.find({
      createdBy : userId
    })
  }

 function getRoomEvents(roomName){
   //TODO check connection
     return Event.find({
      roomName : roomName
    })
  }

  function deleteEvent(userId,startsAt){
    //TODO check connection
    return Event.findOneAndRemove({
      createdBy : userId,
      startsAt :startsAt
    })
  }

  function getRooms(){
    return Office.find();
  }

  

  return {
    createEvent: createEvent,
    getMyEvents : getMyEvents,
    getRoomEvents : getRoomEvents,
    deleteEvent: deleteEvent,
    getRooms :getRooms
  }

}
module.exports = Operations;