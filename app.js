const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
