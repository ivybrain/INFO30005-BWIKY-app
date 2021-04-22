const express = require('express');

const router = express.Router()

const ordersC = require('../controllers/ordersC');

router.use(function (req, res, next) {
  next();
})

router.route('/')
  .get(ordersC.order_list)
  .post(ordersC.order_create);

router.route('/:order_id([0-9a-fA-F]{24})')
  .get(ordersC.order_details)
  .patch(ordersC.order_update)
  .delete(ordersC.order_delete);

module.exports = router;
