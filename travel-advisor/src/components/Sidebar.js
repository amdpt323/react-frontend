import React from 'react'
import { InputLabel, MenuItem, Select, Box ,Grid } from '@mui/material'
import { useGlobalContext } from '../context'
import { Stack } from '@mui/system'

const Sidebar = () => {
  const {search, setSearch,results} = useGlobalContext()

  return (
    <section>
      <Box sx={{padding:"10px"}}>
          <InputLabel>Type</InputLabel>
          <Select
            value={search}
            label='Restaurants'
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            sx={{minWidth:150}}
          >
            <MenuItem value={'catering.restaurant'}>Restaurants</MenuItem>
            <MenuItem value={'education.school'}>Schools</MenuItem>
            <MenuItem value={'commercial.supermarket'}>Supermarkets</MenuItem>
          </Select>
      </Box>
      
      <Grid container spacing={2} sx={{height:'80vh',overflow:'auto'}}>
        {results.map((item,index)=>{
          const {properties:{name,address_line2}}=item
          return (
            <Grid item key={index}>
              <Stack>{name}</Stack>
              <Stack>{address_line2}</Stack>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default Sidebar
