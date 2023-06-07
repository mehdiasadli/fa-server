const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userModel = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    username: { type: String, required: [true, 'Username is required'], trim: true, unique: true },
    password: { type: String, required: [true, 'Password is required'], trim: true },
    isAdmin: { type: Boolean, default: false },
    tasks: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Task' },
        isSolved: { type: Boolean, default: false }
      }
    ],
    image: String
  },
  { timestamps: true }
)

userModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    next(error)
  }
})

userModel.methods.matchPasswords = async function (password, next) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    next(error)
  }
}

module.exports = model('User', userModel)
