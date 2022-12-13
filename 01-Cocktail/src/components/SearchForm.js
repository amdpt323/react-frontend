import React from 'react'

const SearchForm = () => {
 const searchValue = React.useRef('')
  return (
    <section className='section search'>
      <form action='' className='search-form'>
        <div className='form-control'>
          <label htmlFor='name'>search your cocktail here</label>
          <input type="text" id='name' ref={searchValue} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm