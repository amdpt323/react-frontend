import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const {handlePage} = useGlobalContext()
  return (
    <div>
      <button onClick={() => handlePage('dec')}> prev page</button>
      <button onClick={() => handlePage('inc')}> next page</button>
    </div>
  )
}

export default Buttons