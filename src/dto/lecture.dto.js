const { z } = require('zod')

module.exports.createLectureDTO = z.object({
  body: z.object({
    date: z.coerce.date({
      invalid_type_error: 'Date is invalid',
      required_error: 'Date is required'
    })
  })
})
