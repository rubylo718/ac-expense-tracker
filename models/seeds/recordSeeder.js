const Record = require('../record-model')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected and run the record seeder')
  console.log('record seeder done')
  process.exit()
})
