const Blog = require('../models/blog.model')

async function createBlog(req, res, next) {
  const { title, content } = req.body

  try {
    const blog = new Blog({
      title,
      content,
      author: req.user.id
    })

    await blog.save()

    return res.status(201).json({ message: 'Blog created successfully', data: blog })
  } catch (error) {
    next(error)
  }
}
async function publishBlog(req, res, next) {
  const { id } = req.params

  try {
    const blog = await Blog.findById(id)
    if (!blog) return next({ message: 'Blog not found', statusCode: 404 })

    const updated = await Blog.findByIdAndUpdate(id, { published: true }, { new: true })
    return res.status(200).json({ message: 'Blog updated successfully', data: updated })
  } catch (error) {
    next(error)
  }
}
async function updateBlog(req, res, next) {
  const { id } = req.params

  try {
    const blog = await Blog.findById(id)
    if (!blog) return next({ message: 'Blog not found', statusCode: 404 })

    const updated = await Blog.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json({ message: 'Blog updated successfully', data: updated })
  } catch (error) {
    next(error)
  }
}
async function deleteBlog(req, res, next) {
  const { id } = req.params

  try {
    const blog = await Blog.findById(id)
    if (!blog) return next({ message: 'Blog not found', statusCode: 404 })

    await Blog.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Blog deleted successfully' })
  } catch (error) {
    next(error)
  }
}
async function getBlog(req, res, next) {
  const { id } = req.params

  try {
    const blog = await Blog.findById(id)
    if (!blog) return next({ message: 'Blog not found', statusCode: 404 })

    return res.status(200).json({ message: 'Blog fetched successfully', data: blog })
  } catch (error) {
    next(error)
  }
}
async function getBlogs(req, res, next) {
  try {
    const blogs = await Blog.find()
    return res.status(200).json({ message: 'Blogs fetched successfully', data: blogs })
  } catch (error) {
    next(error)
  }
}

module.exports = { getBlog, getBlogs, createBlog, deleteBlog, updateBlog, publishBlog }
