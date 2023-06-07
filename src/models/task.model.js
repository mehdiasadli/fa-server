const { Schema, model } = require('mongoose')

const DIFFICULT_ENUM = ['SUPER_EASY', 'EASY', 'MEDIUM', 'HARD', 'SUPER_HARD']
const CATEGORY_ENUM = [
  'No Category',
  'Array',
  'Function',
  'Math',
  'String',
  'Boolean',
  'Tree',
  'Graph',
  'Search',
  'Sort',
  'Linked List',
  'Stack',
  'Queue',
  'Number',
  'Object',
  'Dynamic Programming'
]

const taskModel = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  difficulty: { type: String, enum: DIFFICULT_ENUM, default: DIFFICULT_ENUM[2] },
  category: { type: String, enum: CATEGORY_ENUM, default: CATEGORY_ENUM[0] },
  code: { type: String, required: true },
  results: { type: String, required: true }
})

module.exports = model('Task', taskModel)
