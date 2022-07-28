const router = require('express').Router()

const { getRating, postRating, deleteRating } = require('../handler/rating')

const { isAuthenticated } = require('../middleware/isAuthenticated')

router.route('/:media?')
  .get(isAuthenticated, getRating)
  .post(isAuthenticated, postRating)

router.route('/:media/delete')
  .delete(isAuthenticated, deleteRating)

module.exports = router