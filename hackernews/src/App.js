import React from 'react'
import { useGlobalContext } from './context'
import Stories from './Stories'
import SearchForm from './SearchForm'
import Buttons from './Buttons'

const App = () => {
  return (
    <>
      <SearchForm />
      <Buttons />
      <Stories />
    </>
  )
}

export default App
