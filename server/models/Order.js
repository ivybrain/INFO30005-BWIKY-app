const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const order = new Schema({
  // Customer attached to this order
  customer: { type: ObjectId, index: true, required: true},
  // Vendor attached to this order
  vendor: { type: ObjectId, required: true, index: true },
  modified: Date,
  fulfilled: {type: Boolean, default: false},
  fulfilled_time: Date,
  picked_up: {type: Boolean, default: false},
  picked_up_time: Date,
  rating: {type: Number, default: 0},
  comment: String,
  // Records if an order has been rated previously. Used to maintain averages
  rated: {type: Boolean, default: false},

  // Array of items attached to this order
  items: [
    {
      item: ObjectId,
      quantity: Number,
    },
  ],
  // Soft deletion flag
  deleted: {type: Boolean, default: false}
})

module.exports = mongoose.model('Order', order)
