const express = require('express');

const vendorsC = require('../controllers/vendorsC');

const router = express.Router()

router.use(function (req, res, next) {
  next()
})

router.get('/', vendorsC.vendor_list);
router.get('/:id', vendorsC.vendor_details);

module.exports = router;
