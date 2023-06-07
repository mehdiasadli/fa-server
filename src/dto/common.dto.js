const { z } = require('zod')
const mongoose = require('mongoose')

module.exports.idDTO = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'Id is required' })
      .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: 'Id is invalid'
      })
  })
})
