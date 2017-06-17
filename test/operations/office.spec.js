var chai = require('chai');
var expect = chai.expect;
chai.should();
var assert = require('assert');

var Operations = require('../../src/operations');
var Office = require('../../src/model/office');
var operations = new Operations();

describe('office', function () {
 it.only('Should be able to get rooms', function(done){

   
    operations.getRooms()
      .then((rooms) =>{
        console.log("Rooms::",rooms);
      })
      .catch((error) =>{
        console.log("failed to fetch rooms",error)
      })
      .then(() => done())

 })

});