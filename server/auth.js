const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

exports.generate_token = function (user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE,
  })
}

exports.create_digest = async (password) => {
  hash = await bcrypt.hash(password, 10)

  return hash
}

exports.compare_digest = async (password, hash) => {
  result = await bcrypt.compare(password, hash)
  return result
}

exports.authenticate_user = function (req, res, next) {
  // console.log("Authenticating");
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]
  if (!token) return res.sendStatus(401)

  if (
    process.env.hasOwnProperty('ADMIN_OVERRIDE') &&
    token === process.env.ADMIN_OVERRIDE
  )
    return next()

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401)
    req.auth_user = user
    return next()
  })
}
