const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const create_digest = require('../auth').create_digest;

const beautify_unique = require('mongoose-beautiful-unique-validation');

const customer = new Schema({
  email: {type: String, unique: true, index: true, required: true},
  given_name: String,
  family_name: String,
  password: {type: String, set: create_digest, required: true}


});

customer.methods.verify_password = function(password) {
  return this.password === create_digest(password);
}

customer.plugin(beautify_unique)

mongoose.model('Customer', customer)
