import axios from 'axios'
import React from 'react'

const Login = () => {
  const login =  () =>{
     window.open(
      "http://localhost:5000/login",
      "_self"
     )
  }
  return (
    <button onClick={login}>login</button>
  )
}

export default Login