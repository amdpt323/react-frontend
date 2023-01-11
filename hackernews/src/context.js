import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
}

const AppContext = React.createContext()
const API_ADDRESS = 'http://hn.algolia.com/api/v1/search?'

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handlePage = (type) => {
    dispatch({ type: HANDLE_PAGE, payload: type })
  }

  const handleSearch = (value) => {
    dispatch({ type: HANDLE_SEARCH, payload: value })
  }

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStories(`${API_ADDRESS}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page])
  return (
    <AppContext.Provider
      value={{ ...state, handlePage, handleSearch, removeStory }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
