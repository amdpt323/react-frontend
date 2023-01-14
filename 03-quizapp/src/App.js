import React from 'react'
import { useGlobalContext } from './context'
import SetupForm from  './SetupForm'

const App = () => {
  const { loading, index, waiting, questions, correct } = useGlobalContext()

  if(loading){
    return <div>Loading...</div>
  }
  if(waiting){
    return <SetupForm />
  }
  return <div>APP</div>
}

export default App
