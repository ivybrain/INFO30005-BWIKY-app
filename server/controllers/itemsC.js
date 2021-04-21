require('../models/Item')
const mongoose = require('mongoose')

const Item = mongoose.model('Item')

// GET /items
// return list of items
exports.item_list = async (req, res) => {
  const items = await Item.find({})
  res.json(items.map(x => x.toObject()).map(x => add_image(req, x)));
}

// GET /items/:item_id
// Return details of a specified item
exports.item_details = async (req, res) => {
  const item = await Item.findById(req.params['item_id'])
  res.json(add_image(req, item.toObject()))
}

// PATCH /items/:item_id
exports.item_update = function (req, res) {
  res.send('Update an item')
}

// DELETE /items/:item_id
// Delete and return an item as specified by its id
exports.item_delete = async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params['item_id'])

  res.status(200)
  res.json(deletedItem)
}

// DELETE /items
// Delete all items
exports.item_delete_all = async (req, res) => {
  await Item.deleteMany({})
  res.status(200).send()
}

// POST /items
// Creates one or more items
exports.item_create = async (req, res) => {
  try {
    const outputs = await Item.create(req.body)
    res.status(201)
    res.json(outputs)
  } catch (err) {
    return res.status(409).send()
  }
}

// Supporting functions:
function remove_all_items(req, res) {
  // Clean database
  Item.deleteMany({}, function (err, docs) {})
  res.send('All deleted')
}

function add_image(req, item) {
  if (!item || !item.hasOwnProperty("item_name")) {
    return item;
  }
  var image_url = req.get('host') + "/images/items/" + item["item_name"].toLowerCase().replace(" ", "_") + ".png";
  item["item_image_url"] = image_url;
  return item;
}
