if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const express = require('express')
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')
const indexRoute = require('./routes/index')

const port = process.env.PORT
const app = express()
const multihelpers = helpers()

app.engine('hbs', exphbs({ helpers: multihelpers, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(indexRoute)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
