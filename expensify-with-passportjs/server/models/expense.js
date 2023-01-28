const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema(
  {
    expense: {
      type: String,
      required: [true, 'Please Provide Name of the Expense'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide amount of your expense'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please Provide a User'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Expense',ExpenseSchema)
