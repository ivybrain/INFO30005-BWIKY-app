require('../models/Customer')
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer')

//Middleware to set req.customer for any request at /customer/:customer_id/*
exports.find_customer = async (req, res, next) => {

  const customer = await Customer.findById(req.params['customer_id']);
  if (!customer) {
    res.status(404);
    res.send("Customer not found");
    return;
  }
  req.customer = customer;
  return next();
}

exports.customer_list = async(req, res) => {
  const customers = await Customer.find({})
  res.json(customers);
}

exports.customer_details = async(req, res) => {
  res.send("yeet");
}

exports.customer_create = async (req, res) => {
  try {
    await Customer.validate(req.body);
    const outputs = await Customer.create(req.body);
    res.json(outputs);
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
