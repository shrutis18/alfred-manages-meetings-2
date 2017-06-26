var chai = require('chai');
var expect = chai.expect;
chai.should();
var assert = require('assert');

var MongoService = require('../../src/mongoService');
var Office = require('../../src/model/office');
//var mongoService = new MongoService();

describe('office', function () {
 it.only('Should be able to get rooms', function(done){

   
    mongoService.getRooms()
      .then((rooms) =>{
        console.log("Rooms::",rooms);
      })
      .catch((error) =>{
        console.log("failed to fetch rooms",error)
      })
      .then(() => done())

 })

});