
require('../models/Item');
const mongoose = require('mongoose');

const Item = mongoose.model('Item')


// GET /items
// return list of items
exports.item_list = function(req, res) {
  var items = Item.find({}, function(err, docs) {
    res.send(docs);
  })
}


// GET /items/:item_id
// Return details of a specified item
exports.item_details = function(req, res) {
  var item = Item.findById(req.params["item_id"], function(err, docs) {
    res.send(docs);
  })
}


// PATCH /items/:item_id
exports.item_update = function(req, res) {
  res.send("Update an item");
}


// DELETE /items/:item_id
// Delete and return an item as specified by its id
exports.item_delete = function(req, res) {
  var item = Item.findByIdAndDelete(req.params["item_id"], function(err, docs) {
    res.send(docs);
  })
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


// Supporting functions:
function remove_all_items(req, res){
  // Clean database
  Item.deleteMany({}, function(err, docs) {})
  res.send("All deleted");
}


function filter_incoming(req, res) {
  if (!req.body.hasOwnProperty('item')) {
    res.sendStatus(400);
  }
}
