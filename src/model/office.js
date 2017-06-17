var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var officeSchema = new Schema({
  roomName : String
});

var OfficeModel = mongoose.model('Office',officeSchema);
module.exports = OfficeModel;