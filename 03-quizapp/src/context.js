import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const tempURL =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy'

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)

    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results

      if (data.length > 0) {
        setLoading(false)
        setError(false)
        setWaiting(false)
        setQuestions(data)
      } else {
        setWaiting(false)
        setError(true)
      }
    } else {
      setWaiting(false)
    }
  }

  useEffect(() => {
    fetchQuestions(tempURL)
  }, [])

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        isModalOpen,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
