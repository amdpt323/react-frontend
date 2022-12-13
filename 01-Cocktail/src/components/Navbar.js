import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.jpg'

const navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="nav-center">
          <Link to='/'>
            <img src={logo} alt="cocktail" className='logo' />
          </Link>
          <ul className="nav-links">
            <li>
              <Link to='/'>
                home
              </Link>
            </li>
            <li>
              <Link to='/about'>
                about
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar