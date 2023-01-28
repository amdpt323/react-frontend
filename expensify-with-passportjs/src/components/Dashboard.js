import React,{useEffect, useState} from 'react'
import { Grid, Typography ,Button, Stack ,Modal} from '@mui/material'
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
    amount: '$1000',
    createdAt: 'January 3rd 2021',
  },
  {
    id: 2,
    expense: 'Internet ',
    amount: '$1000',
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
  const { totalPrice, data, open, handleOpen, handleClose } = useGlobalContext()
  const [expense,setExpense]  = useState([])
  const totalAmount = expense.reduce((total,item)=>{
    const {amount} = item
    total+=amount
    return total
  },0)

  const fetchExpenses = async () => { 
    try {
      const data = await axios
        .get('http://localhost:5000/expenses')
        
      let expense = data.data.expenses

      expense = expense.map((item,index)=>{
        const {expense,amount,createdAt} = item
        return {
          id:index,
          expense:expense,
          amount:amount,
          createdAt:createdAt,
        }
      })
    
      setExpense(expense)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchExpenses()
  },[])

  const logout = async () =>{
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
        sx={{ display: 'flex', justifyContent: 'space-around' }}
        className='navbar'
      >
        <h1>Expensivify</h1>
        <Button variant='text' onClick={logout}>
          logout
        </Button>
      </Stack>
      <div className='dashboard-header'>
        <h1>
          Viewing <strong>{expense.length} expenses</strong> totalling{' '}
          <strong>${totalAmount}</strong>
        </h1>
        <Button
          variant='contained'
          onClick={handleOpen}
          className='header-btn'
          sx={{ marginLeft: '20vw', marginTop: '1vh' }}
        >
          Add Expense
        </Button>
      </div>
      <div
        style={{
          height: 400,
          width: '60%',
          paddingLeft: '20%',
          paddingTop: '10vh',
        }}
      >
        <DataGrid
          columns={columns}
          rows={expense}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Button
        variant='contained'
        onClick={()=>fetchExpenses()}
        className='header-btn'
        sx={{ marginLeft: '20vw', marginTop: '1vh' }}
      >
        Update Expenses
      </Button>
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
