if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category-model')
const db = require('../../config/mongoose')

const SEEDER_CATEGORY = require('./categoryList.json')

db.once('open', () => {
  console.log('mongodb connected and run the category seeder')
  return Promise.all(
    SEEDER_CATEGORY.map(item => {
      return Category.create(item)
    }))
    .then(() => {
      console.log('category seeder done')
      process.exit()
    })
    .catch(error => console.log(error))
})
