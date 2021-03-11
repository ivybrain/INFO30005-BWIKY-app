
exports.vendor_list = function(req, res) {

  res.send("List of Vendors");
};

exports.vendor_details = function(req, res) {
  var dummy_vendor = {id:1, van_name:"The Van that Can", location:[42, -42],
      location_desc: "On the moon"};
  res.send(dummy_vendor);
};
