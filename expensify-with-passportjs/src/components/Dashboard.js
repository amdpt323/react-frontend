import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button, Stack, Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGlobalContext } from '../context'
import AddExpense from './AddExpense'
import axios from 'axios'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'expense', headerName: 'Expense', width: 350 },
  { field: 'amount', headerName: 'Amount', width: 350 },
  { field: 'createdAt', headerName: 'Created At', width: 350 },
]

const rows = [
  {
    id: 1,
    expense: 'Internet ',
    amount: '1000',
    createdAt: 'January 3rd 2021',
  },
  {
    id: 2,
    expense: 'Gym ',
    amount: '2000',
    createdAt: 'January 3rd 2021',
  },
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Dashboard = () => {
  const { totalPrice, data, open, handleOpen, handleClose,handleSubmit } = useGlobalContext()
  const [expense, setExpense] = useState([])
  const [search, setSearch] = useState('')
  const totalAmount = expense.reduce((total, item) => {
    const { amount } = item
    total += amount
    return total
  }, 0)

  const fetchExpenses = async () => {
    try {
      const data = await axios.get('http://localhost:5000/expenses')

      let expense = data.data.expenses

      expense = expense.map((item, index) => {
        const { expense, amount, createdAt } = item
        return {
          id: index,
          expense: expense,
          amount: amount,
          createdAt: createdAt,
        }
      })

      setExpense(expense)
    } catch (error) {
      console.log(error)
    }
  }

  const searchItem = () => {
    if (search === '') {
      fetchExpenses()
    }
    // const result = expense.filter((item)=>item.expense.toLowercase().includes(search))
    const result = expense.filter((item) =>
      item.expense.toLowerCase().includes(search)
    )
    setExpense(result)
  }

  const dsc = () => {
    const result = expense.sort((e1, e2) =>
    e2.amount-e1.amount
    )
    setExpense([].concat(result))
  }
  const asc = () => {
    const result = expense.sort((e1, e2) => e1.amount - e2.amount)
    setExpense([].concat(result))
  }

  useEffect(() => {
    searchItem()
  }, [search])

  useEffect(() => {
    fetchExpenses()
  }, [handleSubmit])

  const logout = async () => {
    try {
      await axios
        .get('http://localhost:5000/logout')
        .then(window.open('http://localhost:3000/login', '_self'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Stack
        direction='row'
        sx={{ display: 'flex', justifyContent: 'space-around', color: 'white' }}
        className='navbar'
      >
        <h1>Expensivify</h1>
        <Button variant='text' onClick={logout} sx={{ color: 'white' }}>
          logout
        </Button>
      </Stack>
      <div className='dashboard-header'>
        <h1 style={{ fontWeight: 'normal' }}>
          Viewing <strong>{expense.length} expenses</strong> totalling{' '}
          <strong>${totalAmount}</strong>
        </h1>
        <Button
          variant='contained'
          onClick={handleOpen}
          className='header-btn'
          sx={{
            marginLeft: '20vw',
            marginTop: '1vh',
            border: 'none',
            borderRadius: 0,
            backgroundColor: '#2086c0',
          }}
        >
          Add Expense
        </Button>
      </div>
      <div className='asc-dsc'>
        <input
          type='text'
          placeholder='Search Expenses'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <button onClick={asc}>asc</button>
        <button onClick={dsc}>dsc</button>
      </div>
      <div
        style={{
          height: 400,
          width: '60%',
          marginLeft: '20%',
          marginTop: '1%',
          backgroundColor: '#f7f7f7',
          overflow: 'scroll',
        }}
      >
        <div className='data-form'>
          <p className='p-10'>Expense</p>
          <p className='p-10'>Amount</p>
        </div>
        {expense.map((item) => {
          const { id,expense, amount, createdAt } = item
          return (
            <div
              className='data-form'
              key={id}
              style={{ backgroundColor: 'white', margin: '5px' }}
            >
              <div>
                <p className='p-2'>{expense}</p>
                <p className='p-3'>${amount}</p>
              </div>
              <p className='p-4'>{createdAt}</p>
            </div>
          )
        })}
      </div>
      {/* <Button
        variant='contained'
        onClick={() => fetchExpenses()}
        className='header-btn'
        sx={{ marginLeft: '20vw', marginTop: '1vh' }}
      >
        Update Expenses
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <AddExpense />
      </Modal>
    </>
  )
}

export default Dashboard
