const Expense = require('../models/expense')

const addExpense = async ( req, res) => {
 try {
  req.body.createdBy = '63d4e1dce3fb3647d8fb6049'
  const expense = await Expense.create({...req.body})
  res.status(201).json({ expense })
 } catch (error) {
  res.json({error})
 }
}

const getExpense = async (req,res) =>{
 try {
   req.body.createdBy = '63d4e1dce3fb3647d8fb6049'
   const expenses = await Expense.find({ createdBy: req.body.createdBy }).sort('createdAt')
   res.status(201).json({ expenses })
 } catch (error) {
   res.json({ error })
 }
}

module.exports = {addExpense,getExpense}