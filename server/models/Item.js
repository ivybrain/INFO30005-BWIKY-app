const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const item = new Schema({
  item_price: Number,
  item_name: String,
  item_description: String,

  });


module.exports = mongoose.model('Item', item);
