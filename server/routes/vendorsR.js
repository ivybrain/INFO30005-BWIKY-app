const express = require('express');

const vendorsC = require('../controllers/vendorsC');
const ordersR = require('./ordersR');

const router = express.Router()

router.use(function (req, res, next) {
  next();
})

router.route('/')
  .get(vendorsC.vendor_list)
  .post(vendorsC.vendor_create);

router.route('/:vendor_id(\\d+)')
  .get(vendorsC.vendor_details)
  .patch(vendorsC.vendor_update);


router.use('/:vendor_id(\\d+)/orders', ordersR);


module.exports = router;
