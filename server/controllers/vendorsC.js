require('../models/Vendor')
const mongoose = require('mongoose')

const Vendor = mongoose.model('Vendor')

exports.vendor_list = async (req, res) => {
  const vendors = await Vendor.find({})
  res.json(vendors)
}

exports.vendor_details = async (req, res) => {
  const vendor = await Vendor.findById(req.params['vendor_id'])
  res.json(vendor)
}

exports.vendor_create = (req, res) => {
  outputs = []
  for (i = 0; i < req.body.length; i++) {
    const new_vendor = new Vendor(req.body[i])

    if (new_vendor.validate()) {
      outputs.push(new_vendor)
    }
  }

  for (i = 0; i < outputs.length; i++) {
    outputs[i].save()
  }

  res.status(201)
  res.json(outputs)
}

exports.vendor_update = (req, res) => {
  // const query = { _id: params['vendor_id'] }
  // Vendor.findOneAndUpdate(query, req.body, function (err, doc) {
  //   if (err) return res.send(500, { error: err })
  //   return res.send('Succesfully saved.')
  // })
  res.send('all good')
}

exports.vendor_delete = function (req, res) {
  Vendor.findByIdAndDelete(req.params['vendor_id'], function (err, docs) {
    res.send(docs)
  })
}
