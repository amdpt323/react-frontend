import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import About from './pages/About'
import SingleCocktail from './pages/SingleCocktail'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route  path='/about' element={<About/>} />
          <Route  path='/cocktail/:id' element={<SingleCocktail/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
      </Router>
    </>
  )
  
}

export default App
