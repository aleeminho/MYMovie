const express = require('express')

const { getRegister, postRegister, getLogin, postLogin, getSignout } = require('../handler/auth.js')

const { isAuthenticatedAuth } = require('../middleware/isAuthenticated')

const router = express.Router()

router.route('/register')
  .get(isAuthenticatedAuth, getRegister)
  .post(postRegister)

router.route('/login')
  .get(isAuthenticatedAuth, getLogin)
  .post(postLogin)

router.route('/signout')
  .get(getSignout)

module.exports = router
