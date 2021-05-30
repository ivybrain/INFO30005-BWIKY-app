const mongoose = require('mongoose')

const beautify_unique = require('mongoose-beautiful-unique-validation')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const vendor = new Schema({
  van_name: { type: String, required: true, index: true, unique: true },
  location: {
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
    simple: { type: String, required: false },
  },
  ready: { type: Boolean, required: false, default: false },

  // NOTE: Do secure auth stuff
  password: {type: String, required: true},
  rating: {
    type: { rating: Number, count: Number },
    get: (x) => x ? x['rating'] : 5
  },
})

vendor.set('toObject', { getters: false });
vendor.set('toJSON', { getters: true });

vendor.plugin(beautify_unique)



module.exports = mongoose.model('Vendor', vendor)
