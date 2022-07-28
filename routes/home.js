const express = require('express')

const router = express.Router()

const { isAuthenticated, isAuthenticatedAuth } = require('../middleware/isAuthenticated')
const { getHome, getLanding } = require('../handler/home')



router.route('/')
  .get(isAuthenticated, getHome)

router.route('/welcome')
  .get(isAuthenticatedAuth, getLanding)

module.exports = router