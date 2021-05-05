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
