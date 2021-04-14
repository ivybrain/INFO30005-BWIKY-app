
require('../models/Vendor');
const mongoose = require('mongoose');

const Vendor = mongoose.model('Vendor')

exports.vendor_list = function(req, res) {

  var vendors = Vendor.find({}, function(err, docs) {
    res.json(docs);
  })
};

exports.vendor_details = function(req, res) {
  var vendor = Vendor.findById(req.params["vendor_id"], function(err, docs) {
    res.json(docs);
  })

};

exports.vendor_create = function(req, res) {

  outputs = []
  for (i=0; i < req.body.length; i++) {
    const new_vendor = new Vendor(req.body[i]);

    if (new_vendor.validate()) {

      outputs.push(new_vendor);
    }

  }

  for (i=0; i<outputs.length; i++) {
    outputs[i].save()
  }

  res.status(201);
  res.json(outputs);


};

exports.vendor_update = function(req, res) {

};

exports.vendor_delete = function(req, res) {
  Vendor.findByIdAndDelete(req.params["vendor_id"], function(err, docs) {
    res.send(docs);
  });
}
