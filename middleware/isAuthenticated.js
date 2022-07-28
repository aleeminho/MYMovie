const { app } = require('../firebaseConfig')
const { getAuth, onAuthStateChanged } = require('firebase/auth')

const auth = getAuth(app)

const isAuthenticated = (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      req.uid = uid

      next()
    } else {
      // User is signed out
      // ...
      res.redirect('/welcome')
    }
  });
}

const isAuthenticatedAuth = (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {

      next()
    } else {
      res.redirect('/')
    }
  });
}

module.exports = { isAuthenticated, isAuthenticatedAuth }