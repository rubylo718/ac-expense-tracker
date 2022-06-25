const express = require('express')
const router = express.Router()
const homeRoute = require('./modules/home')
const userRoute = require('./modules/users')
const expenseRoute = require('./modules/expense')
const { authCheck } = require('../middleware/authCheck')

router.use('/users', userRoute)
router.use('/expense', authCheck, expenseRoute)
router.use('/', authCheck, homeRoute)

module.exports = router
