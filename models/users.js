require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

const UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  movie: [],
  tv: []
})

module.exports = mongoose.model('User', UserSchema)
