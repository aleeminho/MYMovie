const { initializeApp } = require('firebase/app')

const firebaseConfig = {
  apiKey: "AIzaSyCQPFE2jWngQm1Geb2jlOUdelK-LYYTys8",
  authDomain: "mymovie-1e746.firebaseapp.com",
  projectId: "mymovie-1e746",
  storageBucket: "mymovie-1e746.appspot.com",
  messagingSenderId: "1023558631412",
  appId: "1:1023558631412:web:4dfb716e2a1ca1d57543a1",
  measurementId: "G-SD20J0JTK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = { app }