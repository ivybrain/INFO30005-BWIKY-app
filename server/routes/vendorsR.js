const express = require('express')

const vendorsC = require('../controllers/vendorsC')
const ordersR = require('./ordersR')
const auth = require('../auth')

const router = express.Router()


router.route('/').get(vendorsC.vendor_list).post(vendorsC.vendor_create)
router.post('/login', vendorsC.vendor_login);

router.get('/:vendor_id([0-9a-fA-F]{24})', vendorsC.find_vendor, vendorsC.vendor_details)

router.use('/:vendor_id([0-9a-fA-F]{24})', auth.authenticate_user);
router.use('/:vendor_id([0-9a-fA-F]{24})', vendorsC.find_vendor);

router
  .route('/:vendor_id([0-9a-fA-F]{24})')
  .patch(vendorsC.authenticate_vendor, vendorsC.vendor_update)
  .delete(vendorsC.authenticate_vendor, vendorsC.vendor_delete)

router.use('/:vendor_id([0-9a-fA-F]{24})/orders', ordersR);


module.exports = router
