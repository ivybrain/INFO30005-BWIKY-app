const express = require('express')

const vendorsC = require('../controllers/vendorsC')
const ordersR = require('./ordersR')

const router = express.Router()

router.use(function (req, res, next) {
  next()
})

router.route('/').get(vendorsC.vendor_list).post(vendorsC.vendor_create)

router
  .route('/:vendor_id([0-9a-fA-F]+)')
  .get(vendorsC.vendor_details)
  .patch(vendorsC.vendor_update)
  .delete(vendorsC.vendor_delete)

router.use('/:vendor_id([0-9a-fA-F]+)/orders', ordersR)

module.exports = router
