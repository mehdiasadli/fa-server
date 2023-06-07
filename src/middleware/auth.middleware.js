const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = async function (req, _, next) {
  let token = req.headers?.['x-access-token']

  if (!token) return next({ statusCode: 401, message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!decoded || !decoded?.id) {
      return next({ statusCode: 403, message: 'Invalid token' })
    }

    req.user = await User.findById(decoded.id).select('-password')

    next()
  } catch (error) {
    next(error)
  }
}
