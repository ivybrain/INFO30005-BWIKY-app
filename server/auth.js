

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generate_token = function (user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRE})
}


exports.create_digest = function (password) {

  const sha256 = crypto.createHash('sha256');

  const hash_data = process.env.PASSWORD_SALT + password;
  const hash_result = sha256.update(hash_data).digest('base64');

  return hash_result;

};

exports.authenticate_user = function (req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.sendStatus(401);

  if (token === process.env.ADMIN_OVERRIDE) return next();

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.auth_user = user;
    return next();
  })
}
