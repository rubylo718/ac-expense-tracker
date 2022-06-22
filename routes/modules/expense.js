const express = require('express')
const router = express.Router()
const Record = require('../../models/record-model')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  const simpleDate = req.body.date.toString()
  const record = new Record({ name, date, simpleDate, category, amount })
  return record.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

module.exports = router
