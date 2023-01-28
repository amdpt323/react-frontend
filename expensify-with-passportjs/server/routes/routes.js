const express = require('express')
const {addExpense,getExpense} = require('../controllers/expense')

const router = express.Router()

router.route('/').get(getExpense).post(addExpense)

module.exports = router