const router = require('express').Router()

const {
  getTask,
  getTasks,
  createTask,
  deleteTask,
  submitTask
} = require('../controllers/task.controller')

const validate = require('../middleware/validate.middleware')
const { idDTO } = require('../dto/common.dto')
// const { createBlogDTO, updateBlogDTO } = require('../dto/blog.dto')
const { createTaskDTO } = require('../dto/task.dto')

router.get('/', getTasks)
router.post('/', validate(createTaskDTO), createTask)
router.put('/submit/:id', validate(idDTO), submitTask)
router.get('/:id', validate(idDTO), getTask)
// router.put('/:id', validate(idDTO), validate(updateBlogDTO), updateBlog)
router.delete('/:id', validate(idDTO), deleteTask)

module.exports = router
