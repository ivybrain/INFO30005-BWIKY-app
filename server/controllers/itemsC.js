
// GET /items
exports.item_list = function(req, res) {
  res.send("List of items");
}

// GET /items/:item_id
exports.item_details = function(req, res) {
  res.send("Details of an item");
}

// PATCH /items/:item_id
exports.item_update = function(req, res) {
  res.send("Update an item");
}

// DELETE /items/:item_id
exports.item_delete = function(req, res) {
  res.send("Deletes an item");
}

// POST /items
exports.item_create = function(req, res) {
  res.send("Creates one or more items");
}
