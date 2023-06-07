const Task = require('../models/task.model')
const User = require('../models/user.model')

async function createTask(req, res, next) {
  const { title, code, results, desc, difficulty, category } = req.body

  try {
    const task = new Task({
      title,
      desc,
      difficulty,
      category,
      code,
      results
    })

    await task.save()

    const updated = await User.updateMany(
      {},
      { $push: { tasks: { _id: task._id, isSolved: false } } }
    )

    return res
      .status(201)
      .json({ message: 'Task created successfully', data: task, users: updated })
  } catch (error) {
    next(error)
  }
}
async function updateTask(req, res, next) {}
async function deleteTask(req, res, next) {
  const { id } = req.params

  try {
    const task = await Task.findById(id)
    if (!task) return next({ message: 'Task not found', statusCode: 404 })

    await Task.findByIdAndDelete(id)
    await User.updateMany({}, { $pull: { tasks: { _id: task._id } } })

    return res.status(200).json({
      message: 'Task deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find()
    const user = await User.findById(req.user.id)

    return res.status(200).json({
      message: 'Tasks fetched successfully',
      data: tasks.map((task) => ({
        ...task._doc,
        isSolved: user.tasks.find((t) => t._id.equals(task._id))?.isSolved || false
      }))
    })
  } catch (error) {
    next(error)
  }
}
async function getTask(req, res, next) {
  const { id } = req.params

  try {
    const task = await Task.findById(id)
    if (!task) return next({ message: 'Task not found', statusCode: 404 })

    const user = await User.findById(req.user.id)

    return res.status(200).json({
      message: 'Task fetched successfully',
      data: {
        ...task._doc,
        isSolved: user.tasks.find((t) => t._id.equals(task._id))?.isSolved || false
      }
    })
  } catch (error) {
    next(error)
  }
}

async function submitTask(req, res, next) {
  const { id } = req.params

  try {
    const task = await Task.findById(id)
    if (!task) return next({ message: 'Task not found', statusCode: 404 })

    const user = await User.findById(req.user.id)

    user.tasks = user.tasks.map((t) =>
      !t._id.equals(task._id) ? t : { _id: t._id, isSolved: true }
    )

    await user.save()

    return res.status(200).json({ message: 'User solved task successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = { createTask, getTasks, getTask, deleteTask, submitTask }
