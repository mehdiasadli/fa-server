const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { capitalize } = require('../lib/utils')

/**
 * @method POST
 * @route  /api/auth/register
 * @desc   Creates a new user
 * @access Public
 */
async function register(req, res, next) {
  const { name, isAdmin, username, password } = req.body

  try {
    const isUserExist = await User.findOne({ username })
    if (isUserExist) next({ statusCode: 400, message: 'Username already exists' })

    const user = new User({
      name: capitalize(name),
      username: username.toLowerCase().trim(),
      isAdmin: isAdmin ?? false,
      password
    })

    await user.save()
    return res.status(201).json({ message: 'User created successfully', data: user })
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && (await user.matchPasswords(password, next))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)

      const data = {
        _id: user._id,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
        token
      }

      return res.status(200).json({
        message: 'User logged in successfully',
        data
      })
    }

    return next({ message: 'Invalid username of password', statusCode: 400 })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login }
