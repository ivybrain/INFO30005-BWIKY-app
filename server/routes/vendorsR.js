const express = require('express')

const vendorsC = require('../controllers/vendorsC')
const ordersR = require('./ordersR')
const auth = require('../auth')

const router = express.Router()

// List or create vendors, without authentication
router.route('/').get(vendorsC.vendor_list).post(vendorsC.vendor_create)

// Login post, which returns a JWT
router.post('/login', vendorsC.vendor_login);

// Get vendor details
router.get('/:vendor_id([0-9a-fA-F]{24})', vendorsC.find_vendor, vendorsC.vendor_details)

// Require authentication and retrieve vendor from the database for these requests
router.use('/:vendor_id([0-9a-fA-F]{24})', auth.authenticate_user);
router.use('/:vendor_id([0-9a-fA-F]{24})', vendorsC.find_vendor);

// Require authentication for patching and deleting
router.route('/:vendor_id([0-9a-fA-F]{24})')
  .patch(vendorsC.authenticate_vendor, vendorsC.vendor_update)
  .delete(vendorsC.authenticate_vendor, vendorsC.vendor_delete)

// Use the ordersR router to handle the vendors/orders routes
router.use('/:vendor_id([0-9a-fA-F]{24})/orders', ordersR);


module.exports = router
