import React from 'react'
import { useGlobalContext } from './context'
import Stories from './Stories'
import SearchForm from './SearchForm'
import Buttons from './Buttons'

const App = () => {
  const value = useGlobalContext()
  return (
    <>
      <SearchForm />
      <Buttons />
      <Stories />
    </>
  )
}

export default App
