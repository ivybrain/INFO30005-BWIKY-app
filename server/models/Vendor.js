const mongoose = require('mongoose');

const beautify_unique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const vendor = new Schema({
  van_name: {type: String, required: true, index: true, unique: true},
  // NOTE: Do secure auth stuff
  password: String
}, {timestampts: true});

vendor.plugin(beautify_unique);

mongoose.model('Vendor', vendor);
