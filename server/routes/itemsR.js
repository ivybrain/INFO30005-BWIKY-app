const express = require('express');

const router = express.Router()

const itemsC = require('../controllers/itemsC');

router.use(function (req, res, next) {
  next();
})

router.route('/')
  .get(itemsC.item_list)
  .post(itemsC.item_create);

router.use('/:item_id([0-9a-fA-F]+)', itemsC.find_item);
router.route('/:item_id([0-9a-fA-F]+)')
  .get(itemsC.item_details)
  .patch(itemsC.item_update)
  .delete(itemsC.item_delete);

module.exports = router;
