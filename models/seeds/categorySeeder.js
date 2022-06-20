const Category = require('../category-model')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected and run the category seeder')
  console.log('category seeder done')
  process.exit()
})
