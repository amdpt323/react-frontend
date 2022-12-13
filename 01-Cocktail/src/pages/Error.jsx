import React from 'react'
import { Link  } from 'react-router-dom'

export default function Error() {
  return (
    <section className='section error-page'>
      <div className='error-container'>
        <h1>Opps!!The page you are looking for does not exist</h1>
        <Link to='/' className='btn btn-primary'>
          Back to home
        </Link>
      </div>
    </section>
  )
}
