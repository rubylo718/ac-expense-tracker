const express = require('express')
const router = express.Router()
const Record = require('../../models/record-model')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const simpleDate = req.body.date.toString()
  const record = new Record({ name, date, simpleDate, category, amount, userId })
  return record.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  const simpleDate = req.body.date.toString()
  return Record.findByIdAndUpdate(_id, { name, date, simpleDate, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
