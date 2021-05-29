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
    get: (x) => x['rating'],
    set: add_rating,
  },
})

function add_rating(rating) {
  if (!this.hasOwnProperty('rating')) {
    return { rating: rating, count: 1 }
  }
  const count = this.rating.count
  const new_rating = (this.rating.rating * count + rating) / (count + 1)
  return { rating: new_rating, count: count + 1 }
}

vendor.plugin(beautify_unique)

mongoose.model('Vendor', vendor)
