const router = require('express').Router()

const { getRating, postRating } = require('../handler/rating')

const { isAuthenticated } = require('../middleware/isAuthenticated')

router.route('/:media')
  .get(isAuthenticated, getRating)
  .post(isAuthenticated, postRating)

module.exports = router