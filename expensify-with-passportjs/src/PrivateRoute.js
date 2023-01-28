import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
 const [isAuthenticated,setIsAuthenticated] = useState(true)
 const isTrue = async()=>{
  try {
   await axios
     .get('http://localhost:5000/check')
     .then((res) => console.log(res))
  } catch (error) {
   console.log(error)
  }
 }
 useEffect(()=>{
  isTrue()
 },[])
 if(!isAuthenticated){
  return <Navigate to='/login' />
 }
  return children
}

export default PrivateRoute