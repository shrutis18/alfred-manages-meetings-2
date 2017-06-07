var chai = require('chai');
var expect = chai.expect;
chai.should();
var assert = require('assert');

var Operations = require('../../src/operations');
var Event = require('../../src/model/event');

describe('event', function () {
  it('Should create an event', function (done) {
    //given
    var event = new Event({
      roomName: "Beach",
      title: "Standup",
      description: "Informa",
      startsAt: new Date("2017-07-10T18:30:00Z"),
      endsAt: new Date("2017-07-10T19:30:00Z")
    })
    var operations = new Operations();

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

  it.only('Should throw when trying to create an event for a booked slot',function(done){

    var event = new Event({
      roomName: "Beach",
      title: "Interview",
      description: "Code Pair",
      startsAt: new Date("2017-07-10T14:00:00Z"),
      endsAt: new Date("2017-07-10T20:30:00Z")
    })
    var operations = new Operations();

    operations.createEvent(event)
      .then((data) => {
        console.log("event is created", data);
      })
      .catch((error) => {
        assert.equal(error.message,`Room is already booked for slot ${event.startsAt} to ${event.endsAt}.`);
      })
      .then(() => done())

  })

});