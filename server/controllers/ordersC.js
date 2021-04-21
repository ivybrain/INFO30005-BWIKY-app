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
  //var order = await Vendor.findById(req.params["order_id"]);
  try {
    const orders = await Order.find({ vendor: req.params['vendor_id'] })

    var found = orders.find(function (order, index) {
      if (order._id == req.params['order_id']) return true
    })

    if (found == null) {
      res.send('Order not found.')
    } else {
      res.status(201)
      res.json(found)
    }
  } catch (err) {
    return res.status(409).send(err)
  }

  res.json(order)


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

// DELETE /vendors/:vendor_id/orders
// NOTE: Implement as soft delete
exports.order_delete_all = async (req, res) => {
  await Order.deleteMany({ vendor: req.params.vendor_id })
  res.status(200).send()
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
