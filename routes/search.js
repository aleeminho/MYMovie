const express = require('express')

const router = express.Router()

const { isAuthenticated } = require('../middleware/isAuthenticated')

const { getSearch, postSearch } = require('../handler/search')

router.route('/search')
  .get(isAuthenticated, getSearch)
  .post(isAuthenticated, postSearch)

module.exports = router