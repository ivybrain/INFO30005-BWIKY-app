const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const vendor = new Schema({
  van_name: String,
  // NOTE: Do secure auth stuff
  password: String
}, {timestampts: true});


mongoose.model('Vendor', vendor);
