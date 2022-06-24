const express = require('express')
const router = express.Router()
const Record = require('../../models/record-model')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const amount = record.amount
        totalAmount += amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router
