const express = require('express');

const router = express.Router()

const itemsC = require('../controllers/itemsC');

router.use(function (req, res, next) {
  next();
})

router.route('/')
  .get(itemsC.item_list)
  .post(itemsC.item_create);

router.route('/:item_id(\\d+)')
  .get(itemsC.item_details)
  .patch(itemsC.item_update)
  .delete(itemsC.item_delete);

module.exports = router;
