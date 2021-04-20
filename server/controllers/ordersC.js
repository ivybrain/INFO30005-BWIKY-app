require('../models/Order')
const mongoose = require('mongoose')

const Order = mongoose.model('Order')


// GET /vendors/:vendor_id/orders/
// Get list of orders
exports.order_list = async (req, res) => {
  const orders = await Order.find({ vendor: req.params['vendor_id'] })
  res.json(orders)
}

// GET /vendors/:vendor_id/orders/:order_id
// Gets specific order
exports.order_details = async (req, res) => {
  //res.send('Gets specific order')
  try{
    const orders = await Order.find({ vendor: req.params['vendor_id']})

    var found = orders.find(function(order, index) {

    if(order._id == req.params['order_id'])
      return true;
    })

    if (found == null){
      res.send("Order not found.\n")
    }else{
      res.status(201)
      res.json(found);
    }

  }catch (err){
    return res.status(409).send(err)
  }
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


// GET /vendors/:vendor_id/orders/?fulfilled=false
// Description: Shows list of all outstanding orders for a vendor
exports.orders_unfulfilled = async (req, res) => {

  try{
    // Get unfulfilled orders from specified vendor
    const orders = await Order.find({ vendor: req.params.vendorid, fulfilled: false})

    // Doesn't seem to be working??

    res.status(201)
    res.json(orders)

  } catch (err){
    return res.status(409).send(err)
  }

}
