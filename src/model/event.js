var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
  roomName : String,
  title : String,
  description : String,
  startsAt : Date,
  endsAt :  Date
});

var EventModel = mongoose.model('Event',eventSchema);
module.exports = EventModel;