const express = require('express')
const router = express.Router()
const Record = require('../../models/record-model')
const Category = require('../../models/category-model')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort('id')
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const simpleDate = req.body.date.toString()
  Category.findOne({ id: category })
    .lean()
    .then(foundCategory => {
      const categoryId = foundCategory._id
      Record.create({
        name, date, simpleDate, amount, categoryId, userId
      })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort('id')
    const _id = req.params.id
    const record = await Record.findById(_id).populate('categoryId').lean()
    res.render('edit', { categories, record })
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const { name, date, category, amount } = req.body
    const simpleDate = req.body.date.toString()
    const foundCategory = await Category.findOne({ id: category }).lean()
    const categoryId = foundCategory._id
    await Record.findByIdAndUpdate(_id, { name, date, simpleDate, categoryId, amount })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
