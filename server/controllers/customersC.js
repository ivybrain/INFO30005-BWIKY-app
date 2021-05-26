require('../models/Customer')
const mongoose = require('mongoose')
const auth = require('../auth')

const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');

//Middleware to set req.customer for any request at /customer/:customer_id/*
exports.find_customer = async (req, res, next) => {

  const customer = await Customer.findById(req.params['customer_id']).select("-password");;
  if (!customer) {
    res.status(404);
    res.send("Customer not found");
    return;
  }

  if (req.auth_user && customer != req.auth_user) {
    return res.sendStatus(401);
  }

  req.customer = customer;
  return next();
}

exports.customer_list = async(req, res) => {
  const customers = await Customer.find({}).select("-password");
  res.json(customers);
}

exports.customer_details = async(req, res) => {
  res.json(req.customer);
}

exports.customer_create = async (req, res) => {
  req.body.password = req.body.hasOwnProperty("password") && req.body.password ?
                      await auth.create_digest(req.body.password) : null

  try {
    const output = await Customer.create(req.body);
    output.password = undefined;
    res.json(output);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
}

exports.customer_update = async (req, res) => {

  req.body.password = req.body.hasOwnProperty("password") && req.body.password ?
                      auth.create_digest(req.body.password) : undefined

  try {
    const updated = await Customer.findByIdAndUpdate(
      req.customer,
      req.body,
      { new: true });

    updated.password = undefined;
    res.json(updated);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
}

exports.customer_delete = async(req, res) => {
  const deleted = await Customer.findByIdAndDelete(req.customer.id);
  res.status(200);
  res.json(deleted);
}


exports.customer_orders = async(req, res) => {
  const orders = await Order.find({ customer: req.customer })
  res.json(orders);
}

exports.customer_login = async(req, res) => {
  if (!(req.body.hasOwnProperty("email")) && req.body.hasOwnProperty("password")) {
    res.sendStatus(400);
    return;
  }
  var customer = await Customer.findOne({"email":req.body.email});
  if (!customer) return res.sendStatus(403);

  if (await auth.compare_digest(req.body.password, customer.password)) {
    customer.password = undefined
    const token = auth.generate_token(customer.toObject());
    res.json(token);
  } else {
    res.sendStatus(403);
  }
}
