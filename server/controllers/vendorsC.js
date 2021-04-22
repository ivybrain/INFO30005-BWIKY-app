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
  const vendors = await Vendor.find({})
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
