const express = require('express')
const router = express.Router()
const Record = require('../../models/record-model')
const Category = require('../../models/category-model')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort('id')
    const userId = req.user._id
    const filterCategoryValue = req.query.categoryFilter  
    const userAllRecords = await Record.find({ userId }).populate('userId').populate('categoryId').lean()
    const userRecords = (filterCategoryValue && filterCategoryValue !== '0') ? userAllRecords.filter(records => records.categoryId.id === filterCategoryValue) : userAllRecords
    let totalAmount = 0
    userRecords.forEach(record => totalAmount += record.amount)
    userRecords.forEach(record => totalAmount += record.amount)
    res.render('index', { categories, userRecords, totalAmount, filterCategoryValue })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
