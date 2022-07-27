const User = require('../models/users')

const ratingHandler = {
  getRating: (req, res) => {
    res.json({ status: 'Anjay' })
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
      console.log(exist)
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
    // res.json({ status: rating, user, movieId: req.query.movieId })
  }
}

module.exports = ratingHandler
