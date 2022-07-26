const router = require('express').Router()

const { getDetails } = require('../handler/details')

const { isAuthenticated } = require('../middleware/isAuthenticated')

router.route('/:id/:media')
  .get(isAuthenticated, getDetails)

module.exports = router