import React, { useState } from 'react'
import {Box} from '@mui/material'
import { useGlobalContext } from '../context'
import axios from 'axios'

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


const AddExpense = () => {
  const {handleClose,setExpense,setAmount,handleSubmit} = useGlobalContext()
  
  return (
    <Box sx={style}>
      <form>
        <label htmlFor=''>expense</label>
        <br />
        <input
          type='text'
          onChange={(e) => {
            setExpense(e.target.value)
          }}
        />
        <br />
        <label htmlFor=''>amount</label>
        <br />
        <input
          type='number'
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
        <br />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </Box>
  )
}

export default AddExpense