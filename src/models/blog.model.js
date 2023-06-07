const { Schema, model } = require('mongoose')

const blogModel = new Schema({
  title: { type: String },
  content: { type: String },
  published: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Blog', blogModel)
