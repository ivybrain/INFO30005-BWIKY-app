const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const item = new Schema({
  item_price: Number,
  item_name: String,
  item_description: String,
  item_image: {
    type: Buffer, // Store image as Binary data
    set: toBinary
  }
  });


function toBinary(item_image) {
  // Convert base64 string to binary data
    let image = new Buffer(image_string, 'base64');

    return image;
  }

mongoose.model('Item', item);
