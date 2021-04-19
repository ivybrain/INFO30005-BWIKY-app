const express = require('express')

const router = express.Router()

const ordersC = require('../controllers/ordersC')

router.use(function (req, res, next) {
  next()
})

router
  .route('/vendors/:vendor_id([0-9a-fA-F]+)/orders')
  .get(ordersC.order_list)
  .post(ordersC.order_create)

router
  .route('/vendors/:vendor_id([0-9a-fA-F]+)/orders/?fulfilled=false')
  .get(ordersC.orders_unfulfilled)
router
   .route('/vendors/:vendor_id([0-9a-fA-F]+)/orders/:order_id([0-9a-fA-F]+)')
   .get(ordersC.order_details)
//   .patch(ordersC.order_update)
//   .delete(ordersC.order_delete)

module.exports = router
