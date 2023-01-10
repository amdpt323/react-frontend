import React from 'react'
import { useGlobalContext } from './context'

const Stories = () => {
  const {isLoading} = useGlobalContext()
  if(isLoading){
    return <div>Loading</div>
  }
  return (
    <div>Stories</div>
  )
}

export default Stories