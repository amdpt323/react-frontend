import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const NotFound = () => {
  const fetchData = async () =>{
    const data =await axios.get('http://localhost:5000')
    console.log(data)
  }
  fetchData()
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to='/'>Go back to home</Link>
    </div>
  )
}

export default NotFound