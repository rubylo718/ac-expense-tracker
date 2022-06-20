const mongoose = require('mongoose')
mongoose.connect(process.env.MONDODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error >"<')
})

db.once('open', () => {
  console.log('mongodb connected! good!')
})

module.exports = db
