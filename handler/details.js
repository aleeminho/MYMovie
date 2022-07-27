const axios = require('axios')

const detailsHandler = {
  getDetails: async (req, res) => {
    const { id, media } = req.params
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const languageNames = new Intl.DisplayNames(['en'], {
      type: 'language'
    });
    if (media === 'tv') {
      res.locals.title = 'MYMovie | TV Details'
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`)
        const data = await response.data

        const creditResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`)
        const creditData = await creditResponse.data

        const reviewResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.API_KEY}&page=1`)
        const reviewData = await reviewResponse.data
        res.render('detailsTv', { data, credit: creditData.cast.slice(0, 5), language: languageNames.of(data.original_language), reviews: reviewData.results, success: req.query?.success })
      }
      catch (error) {
        res.send(error)
      }
    }

    else {
      res.locals.title = 'MYMovie | Movie Details'
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`)
        const data = await response.data

        const creditResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`)
        const creditData = await creditResponse.data

        const reviewResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.API_KEY}&page=1`)
        const reviewData = await reviewResponse.data

        res.render('detailsMovie', { data, budget: formatter.format(data.budget), revenue: formatter.format(data.revenue), credit: creditData.cast.slice(0, 5), language: languageNames.of(data.original_language), reviews: reviewData.results, success: req.query?.success })
      }
      catch (error) {
        res.send(error)
      }
    }
  }
}

module.exports = detailsHandler
