const express = require('express')
const router = express.Router()
const User = require('../../models/user-model')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, password, confirmpassword } = req.body
  const errors = []
  const errorItem = []
  const userExisted = await User.findOne({ name })
  if (userExisted) {
    errors.push({ message: 'This name has been registered.' })
  }
  if (!name || !password || !confirmpassword) {
    errors.push({ message: 'Please fill in the required information.' })
    if (!name) { errorItem.push('errorName') }
    if (!password) { errorItem.push('errorPwd') }
    if (!confirmpassword) { errorItem.push('errorConPwd') }
  }
  if (password !== confirmpassword) {
    errors.push({ message: 'The confirm password does not match the password. Please check.' })
  }
  if (errors.length) {
    return res.render('register', { errorItem, errors, name, password, confirmpassword })
  }
  try {
    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, password: hash })
    req.flash('success_msg', 'Register successfully.')
    res.redirect('/auth/login')
  } catch (error) {
    req.flash('warning_msg', 'Something wen wrong.')
    console.log(error)
    res.redirect('/auth/register')
  }
})

router.get('/logout', (req, res) => {
  req.logout(error => {
    if (error) {
      return next(error)
    }
  })
  req.flash('success_msg', 'Logout successfully.')
  res.redirect('/users/login')
})

module.exports = router
