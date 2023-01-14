import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { handleChange, handleSubmit, quiz ,error} = useGlobalContext()
  return (
    <section>
      <h2>Setup Quiz</h2>
      <form className='setup-form'>
        <div className='form-control'>
          <label htmlFor='amount'>no of questions</label>
          <input
            type='number'
            name='amount'
            id='amount'
            className='form-input'
            value={quiz.amount}
            onChange={handleChange}
            min={1}
            max={50}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='category'>category</label>
          <select
            name='category'
            id='category'
            className='form-input'
            value={quiz.category}
            onChange={handleChange}
          >
          <option value='sports'>sports</option>
          <option value='history'>history</option>
          <option value='politics'>politics</option>
          </select>
        </div>
        <div className='form-control'>
          <label htmlFor='difficulty'>select difficulty</label>
          <select
            name='difficulty'
            id='difficulty'
            className='form-input'
            value={quiz.difficulty}
            onChange={handleChange}
          >
            <option value='easy'>easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>
        </div>
        {error && (
          <p className='error'>
            can't generate questions please try different options
          </p>
        )}
        <button type='submit' onClick={handleSubmit} className='submit-btn'>
          start
        </button>
      </form>
    </section>
  )
}

export default SetupForm
