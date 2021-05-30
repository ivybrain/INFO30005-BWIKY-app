const express = require('express');

const router = express.Router()

const customersC = require('../controllers/customersC');
const auth = require('../auth')

// Getting customer details requires authentication
// POSTing a new customer does not
router.route('/')
  .get(auth.authenticate_user, customersC.customer_list)
  .post(customersC.customer_create);

// Login route
router.post('/login', customersC.customer_login);

// Use the find_customer middleware to retrieve the designated customer from the
// database
router.use('/:customer_id([0-9a-fA-F]{24})', customersC.find_customer);

// All modification of customers requires authentication
router.route('/:customer_id([0-9a-fA-F]{24})')
  .get(auth.authenticate_user, customersC.customer_details)
  .delete(auth.authenticate_user, customersC.customer_delete)
  .patch(auth.authenticate_user, customersC.customer_update);

// Seeing a customer's orders requires authentication
router.get('/:customer_id([0-9a-fA-F]{24})/orders', auth.authenticate_user, customersC.customer_orders);



module.exports = router;
