import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const {handleSearch} = useGlobalContext()
  return (
    <div>
      <p>search</p>
      <input type="text" onChange={(e)=>handleSearch(e.target.value)} />
    </div>
  )
}

export default SearchForm