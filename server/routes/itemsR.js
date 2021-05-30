const express = require('express');

const router = express.Router()

const itemsC = require('../controllers/itemsC');

// List or add iems
router.route('/')
  .get(itemsC.item_list)
  .post(itemsC.item_create);

// Get details of an item
router.use('/:item_id([0-9a-fA-F]{24})', itemsC.find_item);
router.route('/:item_id([0-9a-fA-F]{24})')
  .get(itemsC.item_details);

module.exports = router;
