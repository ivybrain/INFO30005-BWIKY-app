
// GET /vendors/:vendor_id/orders/
exports.order_list = function(req, res) {
  res.send("List of orders for the current vendor");
}

// GET /vendors/:vendor_id/orders/:order_id
exports.order_details = function(req, res) {
  res.send("Gets specific order");
}

// PATCH /vendors/:vendor_id/orders/:order_id
exports.order_update = function(req, res) {
  res.send("Updates an order");
}

// DELETE /vendors/:vendor_id/orders/:order_id
// NOTE: Implement as soft delete
exports.order_delete = function(req, res) {
  res.send("Deletes an order");
}

// POST /vendors/:vendor_id/orders/
exports.order_create = function(req, res) {
  res.send("Creates one or more orders");
}
