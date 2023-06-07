const Lecture = require('../models/lecture.model')

async function getLectureDates(req, res, next) {
  try {
    const dates = await Lecture.find()
    return res.status(200).json({ message: 'Lecture dates fetched successfully', data: dates })
  } catch (error) {
    next(error)
  }
}
async function createLectureDate(req, res, next) {
  const { date } = req.body

  try {
    const lectureDate = new Lecture({
      date
    })

    await lectureDate.save()
    return res.status(201).json({ message: 'Lecture date created successfully' })
  } catch (error) {
    next(error)
  }
}

async function removeLectureDate(req, res, next) {
  const { id } = req.params

  try {
    const lecture = await Lecture.findById(id)
    if (!lecture) return next({ message: 'Lecture not found', statusCode: 404 })

    await Lecture.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Lecture deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getLectureDates, createLectureDate, removeLectureDate }
