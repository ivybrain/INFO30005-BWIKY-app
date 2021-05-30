const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const item = new Schema({
  item_price: Number,
  item_name: String,
  item_description: String,

  });


function toBinary(item_image) {
  // Convert base64 string to binary data
    let image = new Buffer(image_string, 'base64');

    return image;
  }

module.exports = mongoose.model('Item', item);
