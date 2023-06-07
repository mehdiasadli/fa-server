const User = require('../models/user.model')

async function getUsers(req, res, next) {
  try {
    const users = await User.find().select('-password -updatedAt -__v')

    return res.status(200).json({
      data: users
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getUsers }
