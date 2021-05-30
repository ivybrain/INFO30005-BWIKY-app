const auth = require('../auth')

const Customer = require('../models/Customer');
const Order = require('../models/Order');

//Middleware to set req.customer for any request at /customer/:customer_id/*
exports.find_customer = async (req, res, next) => {

  // Retrieve the customer
  const customer = await Customer.findById(req.params['customer_id']).select("-password");;

  // Error if the customer isn't found
  if (!customer) {
    res.status(404);
    res.send("Customer not found");
    return;
  }

  // Ensure that, if a user is authenticated (not admin), the user id matches
  // the customer id. This ensures only a customer can access their own details
  if (req.auth_user && (customer._id != req.auth_user._id)) {
    return res.sendStatus(401);
  }

  // Store the customer in the request object
  req.customer = customer;
  return next();
}

// GET /customers
exports.customer_list = async(req, res) => {

  // If there is no authenticated user (admin is authenticated), show all customers
  if (!req.auth_user) {
    // Do not expose the password hashes
    customers = await Customer.find({}).select("-password");
    return res.json(customers);
  }

  // If authenticated user is not a custmoer, do not show them customer details
  if (!req.auth_user.family_name)
    return res.sendStatus(401);

  // If authenticated user is a customer, find and return that customer
  try {
    const customer = await Customer.findById(req.auth_user._id).select("-password");
    return res.json(customer);
  }
  catch(err){
    return res.sendStatus(401);
  }


}

// GET /cutomers/:id
exports.customer_details = async(req, res) => {
  // Customer has been retrieved by find_customer, so send it
  res.json(req.customer);
}

// POST /customers
exports.customer_create = async (req, res) => {

  // Make sure the body has a password, and hash it
  if (!req.body.password)
    return sendStatus(400);

  req.body.password = await auth.create_digest(req.body.password);

  try {
    // Create and store new customer, then return it minus the password hash
    const output = await Customer.create(req.body);
    output.password = undefined;
    res.json(output);
  }
  catch(err) {
    // Error means some required fields are missing, so send 400 Bad Request
    res.status(400);
    res.json(err);
  }
}

// PATCH /customers/:id
// Update any component of a customer
exports.customer_update = async (req, res) => {

  // If the patch includes a password, hash it
  if (req.body.hasOwnProperty("password")) {
    // only allow non-empty passwords
    if (req.body.password)
      req.body.password = await auth.create_digest(req.body.password);
    else
      delete req.body.password;
  }

  try {
    // Update the record
    const updated = await Customer.findByIdAndUpdate(
      req.customer,
      req.body,
      { new: true });

    // Remove the password hash from the output and send the updated record
    updated.password = undefined;
    res.json(updated);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
}

// DELETE /customers/:id
exports.customer_delete = async(req, res) => {
  const deleted = await Customer.findByIdAndDelete(req.customer.id);
  res.status(200);
  res.json(deleted);
}

// GET /customers/:id/orders
// Gets orders for a given customer. This is a seccondary way to access orders.
// Any POST, PATCH, or GET for a singular order is done through the
// vendors/:id/orders/:id route
exports.customer_orders = async(req, res) => {
  // Find all non-deleted orders for this customer
  const orders = await Order.find({ customer: req.customer , deleted: {$ne: true}})
  res.json(orders);
}

// POST /customers/login
exports.customer_login = async(req, res) => {
  // Ensure body has email and password
  if (!(req.body.email && req.body.password)) {
    res.sendStatus(400);
    return;
  }

  // Fetch the customer by their email address
  var customer = await Customer.findOne({"email":req.body.email});
  if (!customer) return res.sendStatus(403);

  // Compare the hash of this password with the customer's stored hash
  if (await auth.compare_digest(req.body.password, customer.password)) {

    // Create a JWT encoding this customer, minus the hashed password
    customer.password = undefined
    const token = auth.generate_token(customer.toObject());
    res.json(token);
  } else {
    res.sendStatus(403);
  }
}
