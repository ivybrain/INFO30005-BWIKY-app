require('../models/Vendor')
const mongoose = require('mongoose')

const Vendor = mongoose.model('Vendor')

// GET /vendors
// return list of vendors
exports.vendor_list = async (req, res) => {
  const vendors = await Vendor.find({})
  res.json(vendors)
}

// GET /vendors/:vendor_id
// Return details of a specified vendor
exports.vendor_details = async (req, res) => {
  const vendor = await Vendor.findById(req.params['vendor_id'])
  res.json(vendor)
}

// POST /vendors
// Creates one or more vendors
exports.vendor_create = async (req, res) => {
  try {
    const outputs = await Vendor.create(req.body)
    res.status(201)
    res.json(outputs)
  } catch (err) {
    return res.status(409).send()
  }
}

// PATCH /vendors/:vendor_id
exports.vendor_update = async (req, res) => {
  const query = { _id: req.params['vendor_id'] }

  try {
    const updatedVendor = await Vendor.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true },
    )
    res.status(200)
    res.json(updatedVendor)
  } catch (err) {
    res.status(500)
  }
}

// DELETE /vendors/:vendor_id
exports.vendor_delete = async (req, res) => {
  const deletedVendor = await Vendor.findByIdAndDelete(req.params['vendor_id'])

  res.status(200)
  res.json(deletedVendor)
}

// DELETE /vendors
exports.vendor_delete_all = async (req, res) => {
  await Vendor.deleteMany({})
  res.status(200).send()
}
