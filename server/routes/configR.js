const express = require('express');

const router = express.Router()

const Config = require('../models/Config')


// This is such a simple route, there is no need for a seperate controller
router.route('/').get(async(req, res) => {

  // If there is a config document in the database, retrieve it
  var config = await Config.findOne({});

  // Otherwise, generate a new one with default values
  if (!config) {
    config = await Config.create({});
  }

  res.json(config);

})


module.exports = router;
