require('../models/Vendor')
const mongoose = require('mongoose')

const Vendor = mongoose.model('Vendor')

// Middleware to set req.vendor for any request at /vendor/:vendor_id/*
exports.find_vendor = async (req, res, next) => {

  const vendor = await Vendor.findById(req.params['vendor_id']);
  if (!vendor) {
    res.status(404);
    res.send("Vendor not found");
    return;
  }
  req.vendor = vendor;
  return next();
}

// GET /vendors
// return list of vendors
exports.vendor_list = async (req, res) => {

  var find_params = {};
  var has_location = false;
  var lat, long;

  if (req.query.hasOwnProperty('lat') && req.query.hasOwnProperty('long')) {
    has_location = true;
    lat = parseFloat(req.query.lat);
    long = parseFloat(req.query.long);

    // Search for all vendors within 1 degree, ~= 100km
    // Degree threshold
    const dg_th = 1;
    find_params['location'] = {lat: lat};
    //find_params['location'] = {lat: { $gte: lat-dg_th, $lte: lat+dg_th}, long: { $gte: long-dg_th, $lte: long+dg_th}};
  }

  find_params = {};
  console.log(find_params);
  var vendors = await Vendor.find(find_params)



  if (has_location) {
    vendors = vendors.map(x => [Math.sqrt(Math.pow(lat - x.location.lat, 2.0) + Math.pow(long - x.location.long, 2.0)), x]);
    vendors = vendors.sort();
    console.log(vendors[0]);
    res.json(vendors.map(x=> x[1]));

    return;
  }

  if (req.query.hasOwnProperty('limit')) {
    res.json(vendors.slice(0, req.query.limit));
    return;
  }
  res.json(vendors);
}

// GET /vendors/:vendor_id
// Return details of a specified vendor
exports.vendor_details = async (req, res) => {
  res.json(req.vendor);
}

// POST /vendors
// Creates one or more vendors
exports.vendor_create = async (req, res) => {
  try {
    const outputs = await Vendor.create(req.body)
    res.status(201)
    res.json(outputs)
  } catch (err) {
    res.status(409);
    res.json(outputs);
  }

}

// PATCH /vendors/:vendor_id
// Update vendor's status
exports.vendor_update = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.vendor,
      { $set: req.body },
      { new: true },
    )
    res.status(200);
    res.json(updatedVendor);

  } catch (err) {
    res.status(500)
  }
}

// DELETE /vendors/:vendor_id
// Delete a vendor
exports.vendor_delete = async (req, res) => {
  const deletedVendor = await Vendor.findByIdAndDelete(req.vendor)

  res.status(200)
  res.json(deletedVendor)
}

// DELETE /vendors
exports.vendor_delete_all = async (req, res) => {
  await Vendor.deleteMany({})
  res.status(200).send()
}
