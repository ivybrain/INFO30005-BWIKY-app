const express = require('express');

const router = express.Router()

const customersC = require('../controllers/customersC');
const auth = require('../auth')

router.route('/')
  .get(auth.authenticate_user, customersC.customer_list)
  .post(customersC.customer_create);

router.post('/login', customersC.customer_login);

router.use('/:customer_id([0-9a-fA-F]{24})', customersC.find_customer);

router.route('/:customer_id([0-9a-fA-F]{24})')
  .get(auth.authenticate_user, customersC.customer_details)
  .delete(auth.authenticate_user, customersC.customer_delete)
  .patch(auth.authenticate_user, customersC.customer_update);

router.get('/:customer_id([0-9a-fA-F]{24})/orders', auth.authenticate_user, customersC.customer_orders);



module.exports = router;
