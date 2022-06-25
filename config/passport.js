const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
    User.findOne({ name })
      .then(foundUser => {
        if (!foundUser) {
          return done(null, false, { message: 'User is not exist. Please register.' })
        }
        return bcrypt.compare(password, foundUser.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Name or Password incorrect.' })
            } else {
              return done(null, foundUser)
            }
          })
      })
      .catch(error => done(error, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, false))
  })
}
