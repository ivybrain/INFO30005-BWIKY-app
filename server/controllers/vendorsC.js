
exports.vendor_list = function(req, res) {

  res.send("List of Vendors");
};

exports.vendor_details = function(req, res) {
  var id = req.params['vendor_id']
  var dummy_vendor = {id:id, van_name:"The Van that Can", location:[42, -42],
      location_desc: "On the moon"};
  res.send(dummy_vendor);
};


exports.vendor_create = function(req, res) {
  res.status(201);
  res.send(req.body);

};
