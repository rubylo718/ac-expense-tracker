const express = require('express')
const router = express.Router()
const User = require('../../models/user-model')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', 
  passport.authenticate('local', { 
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, confirmPassword } = req.body
  User.findOne({ name })
    .then(foundUser => {
      if (foundUser) {
        res.render('register', { name, password, confirmPassword})
      } else {
        const newUser = new User({ name, password, confirmPassword })
        newUser.save()
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout(error => {
    if (error) {
      return next(error)
    }
  })
  res.redirect('/users/login')
})

module.exports = router
