const express = require('express')
const router = express.Router()
const homeRoute = require('./modules/home')
const userRoute = require('./modules/users')
const expenseRoute = require('./modules/expense')

router.use('/users', userRoute)
router.use('/expense', expenseRoute)
router.use('/', homeRoute)


module.exports = router