require('../models/Vendor');
require('../models/Order');
const mongoose = require('mongoose');

const Vendor = mongoose.model('Vendor');
const Order = mongoose.model('Order');


// GET /vendors/:vendor_id/orders/
exports.order_list = function(req, res) {
  res.send("List of orders for the current vendor");
}

// GET /vendors/:vendor_id/orders/:order_id
exports.order_details = function(req, res) {
  var order = Vendor.findById(req.params["order_id"], function(err, docs) {})
  if (order.vendor != req.params["vendor_id"]) {
    res.sendStatus(404);
    return;
  }

  res.json(order)


}

// PATCH /vendors/:vendor_id/orders/:order_id
exports.order_update = function(req, res) {
  res.send("Updates an order");
}

// DELETE /vendors/:vendor_id/orders/:order_id
// NOTE: Implement as soft delete
exports.order_delete = function(req, res) {
  res.send("Deletes an order");
}

// POST /vendors/:vendor_id/orders/
exports.order_create = function(req, res) {
  res.send("Creates one or more orders");
}
