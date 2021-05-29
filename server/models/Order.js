const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const order = new Schema({
  customer: { type: ObjectId, index: true, required: true},
  vendor: { type: ObjectId, required: true, index: true },
  modified: Date,
  fulfilled: {type: Boolean, default: false},
  fulfilled_time: Date,
  picked_up: {type: Boolean, default: false},
  picked_up_time: Date,
  rating: {type: Number, default: 0},
  comment: String,
  rated: {type: Boolean, default: false},

  items: [
    {
      item: ObjectId,
      quantity: Number,
    },
  ],
  deleted: {type: Boolean, default: false}
})

mongoose.model('Order', order)
