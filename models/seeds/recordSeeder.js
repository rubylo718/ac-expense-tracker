const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record-model')
const User = require('../user-model')
const db = require('../../config/mongoose')

const SEED_USERS = [
  { name: '廣志', password: '12345678', seedUserId: 1 },
  { name: '小新', password: '12345678', seedUserId: 2 }
]

const SEED_RECORD = [
  { name: '午餐', simpleDate: '2019/4/23', amount: 60, seedUser: 1 },
  { name: '晚餐', simpleDate: '2019/4/23', amount: 60, seedUser: 1 },
  { name: '捷運', simpleDate: '2019/4/23', amount: 120, seedUser: 1 },
  { name: '電影：驚奇隊長', simpleDate: '2019/4/13', amount: 220, seedUser: 2 },
  { name: '租金', simpleDate: '2015/4/01', amount: 25000, seedUser: 1 }
]
db.once('open', () => {
  console.log('mongodb connected and run the record seeder')
  return Promise.all(
    SEED_USERS.map(seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          password: hash,
          seedUserId: seedUser.seedUserId
        }))
        .then(seedUser => {
          return Promise.all(SEED_RECORD.map(seedRecord => {
            if (seedRecord.seedUser === seedUser.seedUserId) {
              seedRecord.userId = seedUser._id
              return Record.create(seedRecord)
            }
          }))
        })
    })
  )
    .then(() => {
      console.log('record seeder done')
      process.exit()
    })
    .catch(error => console.log(error))
})
