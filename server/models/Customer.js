const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const auth = require('../auth');

const beautify_unique = require('mongoose-beautiful-unique-validation');

const customer = new Schema({
  email: {type: String, unique: true, index: true, required: true},
  given_name: {type: String, required:true},
  family_name: {type: String, required:true},
  password: {type: String, required: true}


});

customer.plugin(beautify_unique)

mongoose.model('Customer', customer)
