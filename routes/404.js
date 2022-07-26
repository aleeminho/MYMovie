const router = require('express').Router()

const { notFound } = require('../handler/404')

router.route('*')
  .get(notFound)

module.exports = router
