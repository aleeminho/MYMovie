const { app } = require('../firebaseConfig')

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } = require('firebase/auth')

const User = require('../models/users.js')

const authHandler = {
  getRegister: (req, res) => {
    res.locals.title = 'MYMovie | Register'
    res.render('register.ejs')
  },
  postRegister: (req, res) => {
    const auth = getAuth(app)
    const { name, email, password } = req.body
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, { displayName: name })
          .then(async () => {
            const newUser = new User({
              _id: user.uid,
              name: user.displayName,
              email: user.email
            })
            await newUser.save()
            res.redirect('/')
          })
          .catch(e => {
            res.json(e)
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({ status: errorCode, message: errorMessage })
      });
  },
  getLogin: (req, res) => {
    res.locals.title = 'MYMovie | Login'
    res.render('signIn')
  },
  postLogin: (req, res) => {
    const auth = getAuth(app)
    const { email, password } = req.body
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        res.redirect('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({ status: errorCode, message: errorMessage })
      });
  },
  getSignout: (req, res) => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        res.redirect('/welcome')
      })
      .catch((error) => {
        res.json({ status: error })
      });
  }
}

module.exports = authHandler
