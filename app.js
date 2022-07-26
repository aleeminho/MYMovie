require('dotenv').config()
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const homeRouter = require('./routes/home')
const authRouter = require('./routes/auth')
const searchRouter = require('./routes/search')
const detailsRouter = require('./routes/details')
const notFoundRouter = require('./routes/404')

app.use('/', homeRouter, searchRouter)
app.use('/auth', authRouter)
app.use('/details', detailsRouter)
app.use('*', notFoundRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
})
