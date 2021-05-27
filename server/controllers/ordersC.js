require('../models/Vendor')
require('../models/Order')
const mongoose = require('mongoose')

const Vendor = mongoose.model('Vendor')
const Order = mongoose.model('Order')


// Middleware to set req.order for any request at */order/:order_id/*
exports.find_order = async (req, res, next) => {
  console.log("finding order");


  if (req.params.order_id) {
    const order = await Order.findById(req.params.order_id);

    if (!order || !(String(req.vendor._id) == String(order.vendor)) || order.deleted) {
      res.status(404);
      res.send("Order not found");
      return;

    }
    req.order = order;
  }

  if (req.auth_user &&
      !(req.order.customer == req.auth_user._id || req.order.vendor == req.auth_user._id)) {
    return res.sendStatus(401);
  }

  return next();
}

// GET /vendors/:vendor_id/orders/
// Get list of orders
exports.order_list = async (req, res) => {
  var orders;

  // GET /vendors/:vendor_id/orders/?fulfilled=false or true
  // Get unfulfilled or fulfilled orders from specified vendor
  if (req.query.hasOwnProperty('fulfilled')) {
    const fulfilledBool = req.query['fulfilled'] === 'true'

    console.log(fulfilledBool)

    orders = await Order.find(
      {vendor: req.vendor, fulfilled: true, deleted: {$ne: true}}
    )
  } else {
    // Otherwise, return all orders
    orders = await Order.find({ vendor: req.vendor, deleted: {$ne: true}})

  }

  res.json(orders)
}

// GET /vendors/:vendor_id/orders/:order_id
exports.order_details = async (req, res) => {
  res.json(req.order)
}

// Create a new order
// POST /vendors/:vendor_id/orders/
exports.order_create = async (req, res) => {
  req.body.modified = new Date();

  if (!req.user.given_name)
    return res.sendStatus(401);

  if (req.auth_user) {
    req.body.customer = req.auth_user._id
  }

  try {
    // Get vendor_id from req parameters
    req.body.vendor = req.vendor.id
    // Create new order
    const outputs = await Order.create(req.body)
    res.status(201)
    res.json(outputs)

  } catch (err) {
    return res.status(409).send(err)
  }
}

// PATCH /vendors/:vendor_id/orders/:order_id
// Can be used to mark as fulfilled, add more items, etc
exports.order_update = async (req, res) => {
  try {
    if (req.body.items)
      req.body.modified = new Date();
    else
      delete req.body.modified

    if (req.body.fulfilled) {
      req.body.fulfilled_time = new Date();
    }
    if (req.body.picked_up) {
      req.body.picked_up_time = new Date();
    }

    if (req.body.items) {
      req.body.modified = new Date();
    }

    if (req.body.rating) {
        const rt_obj = req.vendor.rating;
        const new_rating = req.body.rating;
      if (req.order.rated) {
        req.body.rating = {}
        req.body.rating.rating = (rt_obj.rating * rt_obj.count - req.order.rating + new_rating) / rating.count
      } else {
        req.body.rated = true;
        req.body.rating = {};
        req.body.rating.rating = (rt_obj.rating * rt_ibj.count + new_rating) / (rating.count + 1);
        req.body.rating.count = rt_obj.count + 1;

      }
    }

    const updated = await Order.findByIdAndUpdate(
      req.order,
      { $set: req.body },
      { new: true },
    )
    res.status(200);
    res.json(updated);

  } catch (err) {
    res.status(500)
  }
}

exports.order_delete = async (req, res) => {
  const deleted = await Order.findByIdAndUpdate(req.order, {"deleted": true});
  res.json(deleted);
}
