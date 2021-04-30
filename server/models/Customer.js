const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const beautify_unique = require('mongoose-beautiful-unique-validation');

const customer = new Schema({
  email: {type: String, unique: true},
  given_name: String,
  family_name: String


});

customer.plugin(beautify_unique)

mongoose.model('Customer', customer)
