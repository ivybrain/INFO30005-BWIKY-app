const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
  customer: {type: ObjectId, index: true},
  vendor: {type: ObjectId, required: true, index: true},
  modified: Date,
  fulfilled: Date,
  picked_up: Date,
  rating: Number,
  items: [{
    item: ObjectId,
    quantity: Number
  }]



});

mongoose.model('Order', order)
