var chai = require('chai');
var expect = chai.expect;
chai.should();
var assert = require('assert');

var Operations = require('../../src/operations');
var Event = require('../../src/model/event');
var operations = new Operations();

describe('event', function () {
  it('Should create an event', function (done) {
    //given
    var event = new Event({
      roomName: "Beach",
      title: "Standup",
      description: "Informa",
      startsAt: new Date("2017-07-10T08:30:00Z"),
      endsAt: new Date("2017-07-10T09:30:00Z"),
      createdBy: "ssingh@equalexperts.com"
    })


    //when
    operations.createEvent(event)
      .then((data) => {
        console.log("event is created", data);
      })
      .catch((error) => {
        console.log("event is not created", error);
      })
      .then(() => done())

  })

  it('Should throw when trying to create an event for a booked slot', function (done) {

    var event = new Event({
      roomName: "Beach",
      title: "Interview",
      description: "Code Pair",
      startsAt: new Date("2017-07-10T08:30:00Z"),
      endsAt: new Date("2017-07-10T09:30:00Z"),
      createdBy: "vsingh@equalexperts.com"
    })

    operations.createEvent(event)
      .then((data) => {
        console.log("event is created", data);
      })
      .catch((error) => {
        assert.equal(error.message, `Room is already booked for slot ${event.startsAt} to ${event.endsAt}.`);
      })
      .then(() => done())

  })

  it('Should be able to get my events',function(done){
    
    var userId = "ssingh@equalexperts.com";
    operations.getMyEvents(userId)
      .then((events) => {
        console.log("My Events",events);
      })
      .catch((error) =>{
        console.log(error);
      })
      .then(() => done())

  })

  it('Should get Events for a Room', function(done){

    var roomName ="Beach";
    operations.getRoomEvents(roomName)
       .then((events) => {
        console.log("Room Events",events);
      })
      .catch((error) =>{
        console.log(error);
      })
      .then(() => done())

  })

 it('Should be able to remove an event by userId and start time', function(done){
    var userId = "ssingh@equalexperts.com";
    var startsAt = new Date("2017-07-10T08:30:00Z");

    operations.deleteEvent(userId,startsAt)
      .then((event) =>{
        console.log("event deleted:",event);
      })
      .catch((error) =>{
        console.log("failed to delete event",error)
      })
      .then(() => done())

 })

});