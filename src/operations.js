var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Event = require('./model/event');

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
                        resolve(event);
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

  return {
    createEvent: createEvent
  }

}
module.exports = Operations;