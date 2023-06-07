const router = require('express').Router()

const { register, login } = require('../controllers/auth.controller')
const { registerDTO, loginDTO } = require('../dto/auth.dto')

const validate = require('../middleware/validate.middleware')

router.post('/login', validate(loginDTO), login)
router.post('/register', validate(registerDTO), register)

module.exports = router
