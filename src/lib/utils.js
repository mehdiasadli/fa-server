module.exports.capitalize = (string) => {
  return string
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(' ')
}

module.exports.makeSlug = (string) => {
  return string.toLowerCase().split(' ').join('_')
}
