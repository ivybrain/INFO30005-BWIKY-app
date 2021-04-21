require('../models/Vendor');
require('../models/Order');
const mongoose = require('mongoose');

const Vendor = mongoose.model('Vendor');
const Order = mongoose.model('Order');

// GET /vendors/:vendor_id/orders/
// Get list of orders
exports.order_list = async (req, res) => {
  var orders

  // GET /vendors/:vendor_id/orders/?fulfilled=false or true
  // Get unfulfilled or fulfilled orders from specified vendor
  if (req.query.hasOwnProperty('fulfilled')) {
    const fulfilledBool = req.query['fulfilled'] === 'true'

    console.log(fulfilledBool)

    orders = await Order.find({
      vendor: req.params['vendor_id'],
      fulfilled: fulfilledBool,
    })
  } else {

    // Otherwise, return all orders
    orders = await Order.find({ vendor: req.params['vendor_id'] })
  }

  res.json(orders)
}

// GET /vendors/:vendor_id/orders/:order_id
exports.order_details = async(req, res) => {
  var order = await Vendor.findById(req.params["order_id"]);

  res.json(order)


}

// PATCH /vendors/:vendor_id/orders/:order_id
exports.order_update = async(req, res) => {
  res.send("Updates an order");
}

// DELETE /vendors/:vendor_id/orders/:order_id
// NOTE: Implement as soft delete
exports.order_delete = async(req, res) => {
  res.send("Deletes an order");
}

// POST /vendors/:vendor_id/orders/
exports.order_create = async(req, res) => {
  res.send("Creates one or more orders");
}
