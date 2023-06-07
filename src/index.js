const express = require('express')
const cors = require('cors')

require('dotenv').config()

const connectToDB = require('./config/db.config')
const handleError = require('./middleware/error.middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectToDB()

const verifyUser = require('./middleware/auth.middleware')

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/users', verifyUser, require('./routes/user.route'))
app.use('/api/lectures', verifyUser, require('./routes/lecture.route'))
app.use('/api/blogs', verifyUser, require('./routes/blog.route'))
app.use('/api/tasks', verifyUser, require('./routes/task.route'))

app.use(handleError)

const port = process.env.PORT || 7676
app.listen(port, () => console.log('Listening on Port: ' + port))

module.exports = app
