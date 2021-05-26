require('../models/Customer')
const mongoose = require('mongoose')
const auth = require('../auth')

const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');

//Middleware to set req.customer for any request at /customer/:customer_id/*
exports.find_customer = async (req, res, next) => {

  const customer = await Customer.findById(req.params['customer_id']);
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
  const customers = await Customer.find({})
  res.json(customers);
}

exports.customer_details = async(req, res) => {
  res.json(req.customer);
}

exports.customer_create = async (req, res) => {
  try {
    const outputs = await Customer.create(req.body);
    res.json(outputs);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }


}

exports.customer_update = async (req, res) => {

  try {
    const updated = await Customer.findOneAndUpdate(
      req.customer.id,
      req.body,
      { new: true });
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
  const customer = await Customer.findOne({"email":req.body.email});
  if (!customer) return res.sendStatus(403);

  if (customer.verify_password(req.body.password)) {

    const token = auth.generate_token(customer.toObject());
    res.json(token);
  } else {
    res.sendStatus(403);
  }
}
