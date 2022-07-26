const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mymoviedb')

const UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  movies: [],
  tv_shows: []
})

module.exports = mongoose.model('User', UserSchema)
