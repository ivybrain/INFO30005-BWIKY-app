
require('../models/Vendor');
const mongoose = require('mongoose');

const Vendor = mongoose.model('Vendor')

exports.vendor_list = function(req, res) {
  var vendors = Vendor.find({}, function(err, docs) {
    res.send(docs);
  })
};

exports.vendor_details = function(req, res) {
  var vendor = Vendor.findById(req.params["vendor_id"], function(err, docs) {
    res.send(docs);
  })

};

exports.vendor_create = function(req, res) {
  filter_incoming(req, res);
  var new_vendor = new Vendor(req.body["vendor"]);

  new_vendor.save();
  res.status(201);
  res.json(new_vendor);

};

exports.vendor_update = function(req, res) {

};

exports.vendor_delete = function(req, res) {
  Vendor.findByIdAndDelete(req.params["vendor_id"], function(err, docs) {
    res.send(docs);
  });
}

function filter_incoming(req, res) {
  if (!req.body.hasOwnProperty('vendor')) {
    res.sendStatus(400);
  }
}
