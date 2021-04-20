require('../models/Vendor');
require('../models/Order');
const mongoose = require('mongoose');

const Vendor = mongoose.model('Vendor');
const Order = mongoose.model('Order');


// GET /vendors/:vendor_id/orders/
exports.order_list = async(req, res) => {
  res.send("List of orders for the current vendor");
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
