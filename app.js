if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
require('./config/mongoose')

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const usePassport = require('./config/passport')
const indexRoute = require('./routes/index')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

const port = process.env.PORT
const app = express()

app.engine('hbs', exphbs({ helpers: handlebarsHelpers, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.warning_msg = req.flash('error')
  next()
})

app.use(indexRoute)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
