const express = require('express');

const router = express.Router()

const Config = require('../models/Config')

router.route('/').get(async(req, res) => {

  var config = await Config.findOne({});
  if (!config) {
    config = await Config.create({});
  }

  res.json(config);

})


module.exports = router;
