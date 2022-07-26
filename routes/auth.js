const express = require('express')

const { getRegister, postRegister, getLogin, postLogin, getSignout } = require('../handler/auth.js')

const router = express.Router()

router.route('/register')
  .get(getRegister)
  .post(postRegister)

router.route('/login')
  .get(getLogin)
  .post(postLogin)

router.route('/signout')
  .get(getSignout)

module.exports = router
