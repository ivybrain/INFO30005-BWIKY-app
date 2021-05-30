const Vendor = require('../models/Vendor')
const Order = require('../models/Order')

const vendorsC = require('../controllers/vendorsC')

// Middleware to set req.order for any request at */order/:order_id/*
exports.find_order = async (req, res, next) => {
  console.log("finding order");


  if (req.params.order_id) {

    // Fetch an order by the provided id
    const order = await Order.findById(req.params.order_id);

    // Ensure the vendor at this url matches the vendor attached to this order
    // This enforces the /vendors/x/orders/y structure, and prevents
    // orders from being accessed from any vendor
    if (!order || !(String(req.vendor._id) == String(order.vendor)) || order.deleted) {
      res.status(404);
      res.send("Order not found");
      return;

    }
    // Store the order in the request object
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

    // Get all orders non-deleted with designated fulfilled status
    orders = await Order.find(
      {vendor: req.vendor, fulfilled: fulfilledBool, deleted: {$ne: true}}
    )
  } else {
    // Otherwise, get all non-deleted orders
    orders = await Order.find({ vendor: req.vendor, deleted: {$ne: true}})

  }
  // Send the orders
  res.json(orders)
}

// GET /vendors/:vendor_id/orders/:order_id
exports.order_details = async (req, res) => {
  // order has already been fetched by find_order
  res.json(req.order)
}

// Create a new order
// POST /vendors/:vendor_id/orders/
exports.order_create = async (req, res) => {
  req.body.modified = new Date();

  // Ensure the authenticated user is a customer
  if (req.auth_user && !req.auth_user.given_name)
    return res.sendStatus(401);

  // If there is an authenticated user (not admin), ensure they match the customer
  // from the url params
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
    // If the create fails (there is a required field missing), send the error
    // message
    return res.status(409).send(err)
  }
}

// PATCH /vendors/:vendor_id/orders/:order_id
// Can be used to mark as fulfilled, add more items, etc
exports.order_update = async (req, res) => {

  // If the PATCH changes order items, set the modified time
  if (req.body.items)
    req.body.modified = new Date();
  else
    delete req.body.modified

  // If the PATCH marks the order as fulfilled, record the fulfilled time
  if (req.body.fulfilled) {
    req.body.fulfilled_time = new Date();
  }

  // If the PATCH marks the order as picked up, record the picked up time
  if (req.body.picked_up) {
    req.body.picked_up_time = new Date();
  }

  // If the PATCH contains a rating in a valid range, update the corrersponding
  // vendor's average rating, and mark this order as rated
  if (req.body.rating && req.body.rating >= 1 && req.body.rating <= 5) {
      vendorsC.update_rating(req);
      req.body.rated = true;
  } else {
    // If there is an invalid rating, delete it from the body
    if (req.body.rating) delete req.body.rating
  }

  try {
    // Update the order, and send the updated object
    const updated = await Order.findByIdAndUpdate(
      req.order,
      { $set: req.body },
      { new: true },
    )
    res.status(200);
    res.json(updated);

  } catch (err) {
    res.status(400)
  }
}

// DELETE /vendors/:id/orders/:id
// Soft deletes an order, by setting the deleted flag true
exports.order_delete = async (req, res) => {
  const deleted = await Order.findByIdAndUpdate(req.order, {"deleted": true});
  res.json(deleted);
}
