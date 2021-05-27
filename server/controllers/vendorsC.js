require('../models/Vendor')
const mongoose = require('mongoose')

const Vendor = mongoose.model('Vendor')

const auth = require('../auth');

// Middleware to set req.vendor for any request at /vendor/:vendor_id/*
exports.find_vendor = async (req, res, next) => {

  console.log("Finding vendor");
  const vendor = await Vendor.findById(req.params['vendor_id']);
  if (!vendor) {
    res.status(404);
    res.send("Vendor not found");
    return;
  }

  req.vendor = vendor;
  return next();
}

exports.authenticate_vendor = async(req, res, next) => {

  if (req.auth_user && req.auth_user._id != req.vendor._id) {
    return res.sendStatus(401);
  }
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

    // Implement for efficiency with vendors in different cities

    // Search for all vendors within 1 degree, ~= 100km
    // Degree threshold
    //const dg_th = 1;
    //find_params['location'] = {lat: lat};
    //find_params['location'] = {lat: { $gte: lat-dg_th, $lte: lat+dg_th}, long: { $gte: long-dg_th, $lte: long+dg_th}};
  }

  var vendors = await Vendor.find(find_params)

  function distance(x) {
    // return Math.sqrt(
    //   Math.pow(lat - x.location.lat, 2.0) +
    //   Math.pow(long - x.location.long, 2.0));

    function degtorad(a) {
      return a * Math.PI / 180;
    }

    // Radius of earth
    const radius = 6371;
    delta_lat = degtorad(lat - x.location.lat);
    delta_long = degtorad(long - x.location.long);
    const angle = Math.pow(Math.sin(delta_lat / 2)+Math.cos(lat)*Math.cos(x.location.lat)*Math.pow(Math.sin(delta_long/2), 2),2);
    const dist = 2*radius*Math.asin(Math.sqrt(angle));
    return dist

  }

  if (has_location) {
    vendors = vendors.map(x => x.toObject())
        .filter(x => x.hasOwnProperty('location'));

    vendors.forEach(x => x["distance"] = distance(x));
    vendors.sort((x,y) => x.distance - y.distance);

  }

  if (req.query.hasOwnProperty('limit')) {
    res.json(vendors.slice(0, req.query.limit));
    return;
  }
  //vendors.forEach(x => x.password = undefined);
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
  if (!req.body.password)
    return sendStatus(400);
  req.body.password = await auth.create_digest(req.body.password);
  try {
    const outputs = await Vendor.create(req.body)
    Array.isArray(outputs) ? outputs = outputs.map(x => x.password = undefined)
                          : outputs.password = undefined;
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

  if (req.body.hasOwnProperty("password")) {
    if (req.body.password)
      req.body.password = await auth.create_digest(req.body.password);
    else
      delete req.body.password;
  }

  try {
    const updated = await Vendor.findByIdAndUpdate(
      req.vendor,
      { $set: req.body },
      { new: true },
    )
    updated.password = undefined;
    res.status(200);
    res.json(updated);

  } catch (err) {
    res.status(500)
  }
}

exports.vendor_login = async(req, res) => {
  if (!(req.body.van_name && req.body.password)) {
    res.sendStatus(400);
    return;
  }
  var vendor = await Vendor.findOne({"van_name":req.body.van_name});
  if (!vendor) return res.sendStatus(403);

  if (await auth.compare_digest(req.body.password, vendor.password)) {
    vendor.password = undefined
    const token = auth.generate_token(vendor.toObject());
    res.json(token);
  } else {
    res.sendStatus(403);
  }

}

// DELETE /vendors/:vendor_id
// Delete a vendor
exports.vendor_delete = async (req, res) => {
  const deletedVendor = await Vendor.findByIdAndDelete(req.vendor)

  res.status(200)
  res.json(deletedVendor)
}
