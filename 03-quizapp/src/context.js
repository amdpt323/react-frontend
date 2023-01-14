import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const table = {
 sports:21,
 history:23,
 politics:24,
}

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
  const [quiz,setQuiz] = useState({
   amount:10,
   category:'sports',
   difficulty:'easy'
  })

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

  const handleNext = () =>{
   setIndex((value)=>{
    if(value==questions.length-1){
     openModal()
     return 0
    }
    return value + 1
    
   })
  }

  const checkAnswer = (value) =>{
   if(value){
    setCorrect((correct)=>correct+1);
   }
   handleNext()
  }

  const openModal = () =>{
   setIsModalOpen(true)
  }
  
  const closeModal = () => {
   setIsModalOpen(false)
   setCorrect(0)
   setWaiting(true);
  }

  const handleChange = (e) => {
   const name = e.target.name
   const value = e.target.value
   setQuiz({...quiz,[name]:value})
    
   
  }

  const handleSubmit = (e) => {
   e.preventDefault();
   const {category,difficulty,amount} = quiz
   const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}`
   fetchQuestions(url)
  }


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
        handleNext,
        closeModal,
        checkAnswer,
        quiz,
        handleChange,
        handleSubmit
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
