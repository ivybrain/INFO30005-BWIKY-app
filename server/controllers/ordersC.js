require('../models/Vendor')
require('../models/Order')
const mongoose = require('mongoose')

const Vendor = mongoose.model('Vendor')
const Order = mongoose.model('Order')


// Middleware to set req.order for any request at */order/:order_id/*
exports.find_order = async (req, res, next) => {
  const order = await Order.findById(req.params['order_id']);

  if (!order || req.vendor.id != order.vendor) {
    res.status(404);
    res.send("Order not found");
    return;

  }

  if (req.auth_user && order.customer != req.auth_user._id) {
    return res.sendStatus(401);
  }

  req.order = order;
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

    orders = await Order.find({
      vendor: req.vendor,
      fulfilled: fulfilledBool,
    })
  } else {
    // Otherwise, return all orders
    orders = await Order.find({ vendor: req.vendor })

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
    req.body.modified = new Date();
    if (req.body.fulfilled) {
      req.body.fulfilled_time = new Date();
    }
    if (req.body.picked_up) {
      req.body.picked_up_time = new Date();
    }

    if (req.body.items) {
      req.body.modified = new Date();
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

// old order_update function
exports.order_update_old = async (req, res) => {
  const query = { _id: req.params['order_id'] }

  if (req.body.hasOwnProperty('fulfilled')) {
    console.log('Fulfil order')
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        query,
        { $set: req.body['fulfilled'] },
        { new: true },
      )
      res.status(200)
      res.json(updatedOrder)
    } catch (err) {
      res.status(500)
    }
  } else if (req.body.hasOwnProperty('items')) {
    console.log('edit items')
    // We should approach it like this I think:

    /*
    // get Alice to favourite a food
    app.get('/AliceFavourite/:food', async (req, res) => {
      // find Alice
      let thisUser = await User.findOne( {nameGiven: 'Alice'})

      // find food
      let favouriteFood = await Food.findOne( {name: req.params.food})

      // add food to Alice's Favourites list
      favouriteRecord = new Favourite({foodId: favouriteFood._id})
      thisUser.favourites.push(favouriteRecord)

      // save Alice's updated record to database
      await thisUser.save()

      // show the new Alice record
      result = await User.findOne( {nameGiven: 'Alice'})
      res.send(result)
    }) */
  } else {
    res.status(400)
  }
}

// exports.vendor_update = async (req, res) => {
//   const query = { _id: req.params['vendor_id'] }
//   try {
//     const updatedVendor = await Vendor.findOneAndUpdate(
//       query,
//       { $set: req.body },
//       { new: true },
//     )
//     res.status(200)
//     res.json(updatedVendor)
//   } catch (err) {
//     res.status(500)
//   }
// }

// DELETE /vendors/:vendor_id/orders/:order_id
// NOTE: Implement as soft delete
exports.order_delete = async (req, res) => {
  await Order.findByIdAndDelete(req.order);
  res.sendStatus(200);
}

// DELETE /vendors/:vendor_id/orders
// NOTE: Implement as soft delete
exports.order_delete_all = async (req, res) => {
  await Order.deleteMany({ vendor: req.vendor})
  res.status(200).send();
}
