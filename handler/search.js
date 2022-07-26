const axios = require('axios')

const searchHandler = {
  getSearch: async (req, res) => {
    res.locals.title = 'MYMovie | Search'
    res.render('search', { data: undefined })
  },
  postSearch: async (req, res) => {
    res.locals.title = 'MYMovie | Search'
    const { search } = req.body
    const { page, query } = req.query
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?page=${page}&api_key=${process.env.API_KEY}&language=en-US&query=${search || query}`)
      const data = await response.data
      res.render('search', { data: data, pages: data.total_pages > 5 ? 5 : data.total_pages, query: search || query })
    }
    catch (error) {
      res.sendStatus(404)
    }
  }
}

module.exports = searchHandler