const { z } = require('zod')

module.exports.createBlogDTO = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string'
      })
      .min(3, 'Blog title has to be at least 3 characters long'),
    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string'
      })
      .min(50, 'A blog has to be at least 50 characters long')
  })
})

module.exports.updateBlogDTO = z.object({
  body: z.object({
    title: z.optional(
      z
        .string({
          invalid_type_error: 'Title must be a string'
        })
        .min(3, 'Blog title has to be at least 3 characters long')
    ),
    content: z.optional(
      z
        .string({
          invalid_type_error: 'Content must be a string'
        })
        .min(50, 'A blog has to be at least 50 characters long')
    )
  })
})
