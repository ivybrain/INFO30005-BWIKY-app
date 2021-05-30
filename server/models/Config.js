const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const config = new Schema({

  // Discount as a percentage
  discount_value: {type: Number, default: 20, required: true},

  // Number in minutes
  discount_time: {type: Number, default: 15, required: true},
  modify_time : {type: Number, default: 10, required: true}


});

module.exports = mongoose.model('Config', config)
