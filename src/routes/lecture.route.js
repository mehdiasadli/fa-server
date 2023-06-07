const router = require('express').Router()

const {
  getLectureDates,
  createLectureDate,
  removeLectureDate
} = require('../controllers/lecture.controller')

const validate = require('../middleware/validate.middleware')
const { idDTO } = require('../dto/common.dto')
const { createLectureDTO } = require('../dto/lecture.dto')

router.get('/', getLectureDates)
router.post('/', validate(createLectureDTO), createLectureDate)
router.delete('/:id', validate(idDTO), removeLectureDate)

module.exports = router
