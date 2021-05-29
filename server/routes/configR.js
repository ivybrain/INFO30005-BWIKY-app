const express = require('express');

const router = express.Router()

require('../models/Config')

const mongoose = require('mongoose')
const Config = mongoose.model('Config')

router.route('/').get(async(req, res) => {

  var config = await Config.findOne({});
  if (!config) {
    config = await Config.create({});
  }

  res.json(config);

})


module.exports = router;
