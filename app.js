if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const usePassport = require('./config/passport')
const indexRoute = require('./routes/index')

const port = process.env.PORT
const app = express()
const multihelpers = helpers()

app.engine('hbs', exphbs({ helpers: multihelpers, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(indexRoute)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
