
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import NotFound from './components/NotFound'
import PrivateRoute from './PrivateRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App