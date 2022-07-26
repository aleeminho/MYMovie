const express = require('express')

const router = express.Router()

const { isAuthenticated } = require('../middleware/isAuthenticated')
const { get } = require('../handler/home')


router.route('/')
  .get(isAuthenticated, get)

module.exports = router