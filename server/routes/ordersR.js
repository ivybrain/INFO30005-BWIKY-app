const express = require('express');

const router = express.Router()

const ordersC = require('../controllers/ordersC');
const vendorsC = require('../controllers/vendorsC');

const auth = require('../auth')

// All routes are already authenticated by vendor router
router.route('/')
  // Require the correct authenticated vendor (not customer) to see all orders
  // for an endpoint
  .get(vendorsC.authenticate_vendor, ordersC.order_list)
  .post(ordersC.order_create);

router.use('/:order_id([0-9a-fA-F]{24})', ordersC.find_order);
router.route('/:order_id([0-9a-fA-F]{24})')
  .get(ordersC.order_details)
  .patch(ordersC.order_update)
  .delete(ordersC.order_delete);

module.exports = router;
