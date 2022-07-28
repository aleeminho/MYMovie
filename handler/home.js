const axios = require('axios')

const homeHandler = {
  getHome: async (req, res) => {
    res.locals.title = 'MYMovie'
    let data;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`)
      const data = await response.data
      res.render('index', { data: data.results, status: res.locals.status })
    } catch (error) {
      console.log(error)
    }
  },
  getLanding: (req, res) => {
    res.locals.title = 'MYMovie | Landing Page'
    res.render('landingPage')
  }
}

module.exports = homeHandler
