const Vendor = require('../models/Vendor');

const auth = require('../auth');

// Middleware to set req.vendor for any request at /vendor/:vendor_id/*
exports.find_vendor = async (req, res, next) => {

  console.log("Finding vendor");

  // Retrieve the vendor with correct id, without the password hash
  const vendor = await Vendor.findById(req.params['vendor_id']).select("-password");
  if (!vendor) {
    res.status(404);
    res.send("Vendor not found");
    return;
  }

  // If the request is a PATCH with a rating, then we need the full vendor object,
  // without the simplified 'rating' field. Calling toObject() achieves this
  req.vendor = req.method=="PATCH" && req.body.rating ? vendor.toObject() : vendor;
  return next();
}

// Require that the authenticated user is a vendor that matches the vendor from
// the url params
exports.authenticate_vendor = async(req, res, next) => {

  if (req.auth_user && req.auth_user._id != req.vendor._id) {
    return res.sendStatus(401);
  }
  return next();
}

// GET /vendors
// return list of vendors
exports.vendor_list = async (req, res) => {

  var has_location = false;
  var lat, long;

  // If the request has location specified, parse the latitude and longitude
  if (req.query.hasOwnProperty('lat') && req.query.hasOwnProperty('long')) {
    has_location = true;
    lat = parseFloat(req.query.lat);
    long = parseFloat(req.query.long);

  }

  // Fetch all vendors from the database, without their password hashes
  var vendors = await Vendor.find({}).select("-password");

  // Calculates the distance along earth's surface between two coordinates
  function distance(x) {

    function degtorad(a) {
      return a * Math.PI / 180;
    }

    // Radius of earth
    const radius = 6371;
    // Convert coordinate degrees to radians
    delta_lat = degtorad(lat - x.location.lat);
    delta_long = degtorad(long - x.location.long);
    // Calculate the angle between the points, and subsequently the distance
    const angle = Math.pow(Math.sin(delta_lat / 2)+Math.cos(lat)*Math.cos(x.location.lat)*Math.pow(Math.sin(delta_long/2), 2),2);
    const dist = 2*radius*Math.asin(Math.sqrt(angle));
    return dist

  }

  // If a location was specified, only show vendors with a specified location,
  // and sort them by their distance from the point specified in the request
  if (has_location) {
    vendors = vendors.map(x => x.toJSON())
        .filter(x => x.hasOwnProperty('location'));

    vendors.forEach(x => x["distance"] = distance(x));
    vendors.sort((x,y) => x.distance - y.distance);

  }

  // If a limit was specified, return that number of vendors
  if (req.query.hasOwnProperty('limit')) {
    res.json(vendors.slice(0, req.query.limit));
    return;
  }

  // Otherwise, return all the vendors
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

  // Require a password, and generate its hash
  if (!req.body.password)
    return sendStatus(400);
  req.body.password = await auth.create_digest(req.body.password);

  try {
    // Create the specified vendor/s
    const outputs = await Vendor.create(req.body)

    // If multiple vendors were created, remove the password hash from all of them
    // Otherwise remove the password hash from just the one
    Array.isArray(outputs) ? outputs = outputs.map(x => x.password = undefined)
                          : outputs.password = undefined;

    // Send the created objects
    res.status(201)
    res.json(outputs)
  } catch (err) {
    // If there is an error (email conflict or missing field), return the outputs
    // that did succeed
    res.status(409);
    res.json(outputs);
  }

}

// PATCH /vendors/:vendor_id
// Update vendor's status or details
exports.vendor_update = async (req, res) => {

  // if the PATCH includes a password, hash it
  if (req.body.hasOwnProperty("password")) {
    // Only allow non-blank passwords
    if (req.body.password)
      req.body.password = await auth.create_digest(req.body.password);
    else
      delete req.body.password;
  }

  try {
    // Update the vendor in the database
    const updated = await Vendor.findByIdAndUpdate(
      req.vendor,
      { $set: req.body },
      { new: true },
    )
    // Remove the password hash from the updated result
    updated.password = undefined;
    res.status(200);
    res.json(updated);

  } catch (err) {
    res.status(500)
  }
}

// POST /vendors/login
// Generates a JWT for a vendor's login session
exports.vendor_login = async(req, res) => {
  // Require the request has a van name and password
  if (!(req.body.van_name && req.body.password)) {
    res.sendStatus(400);
    return;
  }

  // Find the vendor by the submitted van name
  var vendor = await Vendor.findOne({"van_name":req.body.van_name});
  if (!vendor) return res.sendStatus(403);

  // Compare the submitted password with the stored hash
  if (await auth.compare_digest(req.body.password, vendor.password)) {
    // Remove the hashsed password from the object and encode it in a JWT
    vendor.password = undefined
    const token = auth.generate_token(vendor.toObject());
    // Send the generated token
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

// Updates a vendors average rating, given an order PATCH request
exports.update_rating = async(req) => {
  if (req.body.rating) {
    // Get the existing average rating and count
    const rt_obj = req.vendor.rating ? req.vendor.rating : {rating: 0, count: 0};
    // Get the new rating from the order request
    const new_rating = req.body.rating;
    var new_obj = { rating: {} };
    if (req.order.rated) {
      // If the order has been rated before, subtract the old rating from the
      // rating total before adding the new rating, then dividing by count
      new_obj.rating.rating = (rt_obj.rating * rt_obj.count - req.order.rating + new_rating) / (rt_obj.count?rt_obj.count:1);
      new_obj.rating.count = rt_obj.count;
    } else {
      // If the order has not been rated before, add the new rating to the rating total
      // before dividing by one more than the old count of ratings
      new_obj.rating.rating = (rt_obj.rating * rt_obj.count + new_rating) / (rt_obj.count + 1);
      new_obj.rating.count = rt_obj.count + 1;
    }
    console.log(new_obj);
    try {
      // Update the vendor with the new rating object
      const updated = await Vendor.findByIdAndUpdate(
        req.vendor._id,
        { $set: new_obj},
        { new: true },
      )
    } catch(err) {}

  }
}
