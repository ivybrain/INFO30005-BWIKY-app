const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Generates a JWT for a given user object
exports.generate_token = function (user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE,
  })
}

// Creates a password hash
exports.create_digest = async (password) => {
  hash = await bcrypt.hash(password, 10)

  return hash
}

// Checks the validity of a password against a pre-stored hash
exports.compare_digest = async (password, hash) => {
  result = await bcrypt.compare(password, hash)
  return result
}

// Check the presence and validity of a JWT in the request headers,
// and store the associated user in the request
exports.authenticate_user = function (req, res, next) {
  // console.log("Authenticating");
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]
  if (!token) return res.sendStatus(401)

  // Allow the admin override token, specified in the .env file
  // This is used for postman testing
  if (
    process.env.hasOwnProperty('ADMIN_OVERRIDE') &&
    token === process.env.ADMIN_OVERRIDE
  )
    return next()

  // Verify the token and store the resulting user
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401)
    req.auth_user = user
    return next()
  })
}
