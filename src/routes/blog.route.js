const router = require('express').Router()

const {
  getBlog,
  getBlogs,
  updateBlog,
  createBlog,
  deleteBlog,
  publishBlog
} = require('../controllers/blog.controller')

const validate = require('../middleware/validate.middleware')
const { idDTO } = require('../dto/common.dto')
const { createBlogDTO, updateBlogDTO } = require('../dto/blog.dto')

router.get('/', getBlogs)
router.post('/', validate(createBlogDTO), createBlog)
router.put('/publish/:id', validate(idDTO), publishBlog)
router.get('/:id', validate(idDTO), getBlog)
router.put('/:id', validate(idDTO), validate(updateBlogDTO), updateBlog)
router.delete('/:id', validate(idDTO), deleteBlog)

module.exports = router
