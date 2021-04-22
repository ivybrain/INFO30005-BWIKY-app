require('../models/Vendor')
require('../models/Order')
const mongoose = require('mongoose')

const Vendor = mongoose.model('Vendor')
const Order = mongoose.model('Order')


// Middleware to set req.order for any request at */order/:order_id/*
exports.find_order = async (req, res, next) => {
  const order = await Order.findById(req.params['order_id']);

  if (!order) {
    res.status(404);
    res.send("Order not found");
    return;

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
  //var order = await Vendor.findById(req.params["order_id"]);

  try {
    const orders = await Order.find({ vendor: req.vendor })

    var found = orders.find(function (order, index) {
      if (order._id == req.params['order_id']) return true
    })

    console.log(found)

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
exports.order_update = async (req, res) => {
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
  res.send('Deletes an order')
}

// DELETE /vendors/:vendor_id/orders
// NOTE: Implement as soft delete
exports.order_delete_all = async (req, res) => {
  await Order.deleteMany({ vendor: req.params.vendor_id })
  res.status(200).send()
}
