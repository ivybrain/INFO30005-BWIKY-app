const express = require('express');

const router = express.Router()

const customersC = require('../controllers/customersC');

router.use('/:customer_id([0-9a-fA-F]{24})', customersC.find_customer);

router.route('/')
  .get(customersC.customer_list)
  .post(customersC.customer_create);

router.post('/login', customersC.customer_login);

router.route('/:customer_id([0-9a-fA-F]{24})')
  .get(customersC.customer_details)
  .delete(customersC.customer_delete);

router.get('/:customer_id([0-9a-fA-F]{24})/orders', customersC.customer_orders);

module.exports = router;
