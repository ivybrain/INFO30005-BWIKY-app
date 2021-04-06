
require('../models/Item');
const mongoose = require('mongoose');

const Item = mongoose.model('Item')


// GET /items
// return list of items
exports.item_list = function(req, res) {
  var items = Item.find({}, function(err, docs) {
    res.send(docs);
  })

  /*
  // Clean database
  Item.deleteMany({}, function(err, docs) {})
  res.send("deleted");
  */
}


// GET /items/:item_id
exports.item_details = function(req, res) {
  res.send("Details of an item");
}


// PATCH /items/:item_id
exports.item_update = function(req, res) {
  res.send("Update an item");
}


// DELETE /items/:item_id
exports.item_delete = function(req, res) {
  res.send("Deletes an item");
}


// POST /items
//Creates one or more items
exports.item_create = function(req, res) {
  //filter_incoming(req, res);

  var item_array = []; // Initialise empty array for items

  // Iterate through items in array
  for (i = 0; i < req.body.length; i++){
    var new_item = new Item(req.body[i]);
    new_item.save();
    item_array.push(new_item); // Append each new item to end of array
  }

  res.status(201); // request successful
  res.json(item_array); // return all items as an array
}


function filter_incoming(req, res) {
  if (!req.body.hasOwnProperty('item')) {
    res.sendStatus(400);
  }
}
