require('../models/Order')
const mongoose = require('mongoose')

const Order = mongoose.model('Order')

// GET /vendors/:vendor_id/orders/
exports.order_list = async (req, res) => {
  const orders = await Order.find({ vendor: req.params['vendor_id'] })
  res.json(orders)
}

// GET /vendors/:vendor_id/orders/:order_id
exports.order_details = function (req, res) {
  res.send('Gets specific order')
}

// PATCH /vendors/:vendor_id/orders/:order_id
exports.order_update = async (req, res) => {
  // const vendor_id = req.params['vendor_id']
  // const order_id = req.params['order_id']
  res.send('PATCH not implemented')
}

// DELETE /vendors/:vendor_id/orders/:order_id
// NOTE: Implement as soft delete
exports.order_delete = function (req, res) {
  res.send('Deletes an order')
}

// POST /vendors/:vendor_id/orders/
exports.order_create = async (req, res) => {
  try {
    const outputs = await Order.create(req.body)
    res.status(201)
    res.json(outputs)
  } catch (err) {
    return res.status(409).send(err)
  }
}
