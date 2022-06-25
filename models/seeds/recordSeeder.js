const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record-model')
const User = require('../user-model')
const Category = require('../category-model')
const db = require('../../config/mongoose')

const SEED_USERS = [
  { name: '廣志', password: '12345678' },
  { name: '小新', password: '12345678' }
]

const SEED_RECORD = [
  { name: '午餐', simpleDate: '2019/4/23', amount: 60, user: '廣志', category: '餐飲食品' },
  { name: '晚餐', simpleDate: '2019/4/23', amount: 60, user: '廣志', category: '餐飲食品' },
  { name: '捷運', simpleDate: '2019/4/23', amount: 120, user: '廣志', category: '交通出行' },
  { name: '電影：驚奇隊長', simpleDate: '2019/4/13', amount: 220, user: '小新', category: '休閒娛樂' },
  { name: '租金', simpleDate: '2015/4/01', amount: 25000, user: '廣志', category: '家居物業' }
]
db.once('open', async () => {
  console.log('mongodb connected and run the record seeder')
  try {
    await Promise.all(
    SEED_USERS.map(async seedUser => {
      const hash = await bcrypt.hash(seedUser.password, 10)
      await User.create({
        name: seedUser.name,
        password: hash
      })
    })
    )
    await Promise.all(
      SEED_RECORD.map(async seedRecord => {
        const foundUser = await User.findOne({ name: seedRecord.user })
        seedRecord.userId = foundUser._id
        const foundCategory = await Category.findOne({ name: seedRecord.category })
        seedRecord.categoryId = foundCategory._id
        await Record.create( seedRecord )
      })
    )
  console.log('record seeder done')
  process.exit()
  }
  catch (error) {console.log(error)}
})
