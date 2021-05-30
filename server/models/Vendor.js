const mongoose = require('mongoose')

const beautify_unique = require('mongoose-beautiful-unique-validation')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const vendor = new Schema({
  van_name: { type: String, required: true, index: true, unique: true },

  location: {
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
    // Text description of the location
    simple: { type: String, required: false },
  },
  ready: { type: Boolean, required: false, default: false },

  password: {type: String, required: true},

  // Store ratings as an object with an average rating and a count, to allow
  // this average to be updated
  rating: {
    type: { rating: Number, count: Number },
    // Return only the average component of the rating
    get: (x) => x ? x['rating'] : 5
  },
})

vendor.set('toObject', { getters: false });
vendor.set('toJSON', { getters: true });

vendor.plugin(beautify_unique)

module.exports = mongoose.model('Vendor', vendor)
