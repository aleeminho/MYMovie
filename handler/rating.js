const axios = require('axios')

const User = require('../models/users')

const ratingHandler = {
  getRating: async (req, res) => {
    res.locals.title = "MYMovie | My Rating"
    const user = await User.findById(req.uid)
    const movieArr = []
    for (const i of user.movie) {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${i.id}?api_key=${process.env.API_KEY}`)
      const data = response.data
      const all = { ...data, rating: i.rating }
      movieArr.push(all)
    }
    const showArr = []
    for (const i of user.tv) {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${i.id}?api_key=${process.env.API_KEY}`)
      const data = response.data
      const all = { ...data, rating: i.rating }
      showArr.push(all)
    }
    res.render('rating', { movie: movieArr, show: showArr })
  },
  postRating: async (req, res) => {
    const { rating } = req.body
    const { media } = req.params
    const { mid } = req.query
    try {
      const user = await User.findById(req.uid)
      const newRating = {
        id: mid,
        rating,
      }
      const exist = media === 'tv' ? user.tv.filter(e => e.id === mid) : user.movie.filter(e => e.id === mid)
      if (exist.length > 0) {
        res.redirect(`/details/${mid}/${media}?success=false`)
      } else {
        media === 'tv' ? user.tv.push(newRating) : user.movie.push(newRating)
        await user.save()
        res.redirect(`/details/${mid}/${media}?success=true`)
      }
    } catch (error) {
      res.status(403).send(error)
    }
  },
  deleteRating: async (req, res) => {
    const { mid } = req.query
    const { media } = req.params
    const user = await User.findById(req.uid)
    if (media === 'tv') {
      user.tv = user.tv.filter(e => e.id !== mid)
      await user.save()
    } else if (media === 'movie') {
      user.movie = user.movie.filter(e => e.id !== mid)
    }
    res.redirect('/rating')
  }
}

module.exports = ratingHandler
