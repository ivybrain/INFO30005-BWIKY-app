const express = require('express');

const router = express.Router()

router.use(function (req, res, next) {
  next()
})

router.route('/')
  .get(function (req, res) {res.send('order')});




module.exports = router;
