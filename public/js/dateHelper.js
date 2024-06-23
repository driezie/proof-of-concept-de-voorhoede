// dateHelper.js

/**
 * Format a date object to a localized string in Dutch (nl-NL) format.
 * Returns 'Invalid Date' if the date object is not valid.
 * @param {Date} date - The date object to format.
 * @returns {string} - Formatted date string.
 */
function formatDate(date) {
  if (!date || isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('nl-NL', options)
}

module.exports = {
  formatDate,
}
