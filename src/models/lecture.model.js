const { Schema, model } = require('mongoose')

const lectureModel = new Schema({
  date: { type: Date }
})

module.exports = model('Lecture', lectureModel)
