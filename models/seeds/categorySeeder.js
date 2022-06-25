if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category-model')
const db = require('../../config/mongoose')

const SEEDER_CATEGORY = [
  { name: '家居物業', faIconClass: 'fa-solid fa-house' },
  { name: '交通出行', faIconClass: 'fa-solid fa-van-shuttle' },
  { name: '休閒娛樂', faIconClass: 'fa-solid fa-face-grin-beam' },
  { name: '餐飲食品', faIconClass: 'a-solid fa-utensils' },
  { name: '其他', faIconClass: 'a-solid fa-pen' }
]

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
