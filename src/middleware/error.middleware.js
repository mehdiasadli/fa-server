const DEFAULT_ERR_MESSAGE = 'Something went wrong'

function handleError(err, _, res, _) {
  const status = err.statusCode || 500
  const message = err.message || DEFAULT_ERR_MESSAGE
  res.status(status).json({
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  })
}

module.exports = handleError
