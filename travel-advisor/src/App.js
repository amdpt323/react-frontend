import React from 'react'
import {Grid} from '@mui/material'
import Sidebar from './components/Sidebar'
import Map from './components/Map'

const App = () => {
  return (
    <>
    <div className='top-bar'>Travel Advisor</div>
    <Grid container>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} sx={{backgroundColor:"blue"}}>
        <Map/>
      </Grid>
    </Grid>
    </>
  )
}

export default App
