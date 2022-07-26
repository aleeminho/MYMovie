const { app } = require('../firebaseConfig')
const { getAuth, onAuthStateChanged } = require('firebase/auth')

const auth = getAuth(app)

const isAuthenticated = (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      res.locals.uid = uid
      next()
    } else {
      // User is signed out
      // ...
      res.redirect('/auth/login')
    }
  });
}

module.exports = { isAuthenticated }