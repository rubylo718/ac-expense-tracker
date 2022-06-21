if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const express = require('express')
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')

const port = process.env.PORT
const app = express()
const multihelpers = helpers()

app.engine('hbs', exphbs({ helpers: multihelpers, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
