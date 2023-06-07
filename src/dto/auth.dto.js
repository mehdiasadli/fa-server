const { z } = require('zod')

module.exports.registerDTO = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    }),
    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string'
    }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    }),
    isAdmin: z.optional(z.boolean({ invalid_type_error: 'Is Admin must be a boolean' }))
  })
})

module.exports.loginDTO = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required'
    }),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})
