const express = require('express')
const router = express.Router()
const Record = require('../../models/record-model')
const Category = require('../../models/category-model')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort('id')
    const userId = req.user._id

    const filterCategoryValue = req.query.categoryFilter
    const filterCategory = filterCategoryValue ? await Category.findOne({ id: filterCategoryValue }).lean() : null
    const filterCategoryId = filterCategory ? filterCategory._id : null
    console.log('value', filterCategoryValue,typeof(filterCategoryValue))

    const userRecords = filterCategory ? await Record.find({ userId, categoryId: filterCategoryId }).lean() : await Record.find({ userId }).lean()
    let totalAmount = 0
    await Promise.all(
      userRecords.map(async record => {
        const recordCat = await Category.findById(record.categoryId)
        record.categoryIconClass = recordCat.faIconClass
        totalAmount += record.amount
      })
    )
    res.render('index', { categories, userRecords, totalAmount, filterCategoryValue })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
