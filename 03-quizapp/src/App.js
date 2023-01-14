import React, { useState } from 'react'
import { useGlobalContext } from './context'
import SetupForm from './SetupForm'
import Modal from './Modal'

const App = () => {
  const {
    loading,
    index,
    waiting,
    questions,
    correct,
    isModalOpen,
    handleNext,
    checkAnswer
  } = useGlobalContext()

  if (loading) {
    return <div>Loading...</div>
  }
  if (waiting) {
    return <SetupForm />
  }

  const { correct_answer, incorrect_answers, question } = questions[index]
  let answers = [...incorrect_answers, correct_answer]
  const randomNumber = Math.floor(Math.random()*4)
  if(randomNumber===3){
    answers.push(correct_answer)
  }else{
    answers.push(answers[randomNumber])
    answers[randomNumber]=correct_answer
  }

  return (
    <main>
      {isModalOpen ? (
        <Modal />
      ) : (
        <div>
          <p>
            correct answers {correct}/{index}
          </p>
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <article className='answer-list'>
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => {
                    checkAnswer(answer === correct_answer)
                  }}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className='answers-item'
                />
              )
            })}
          </article>
          <button
            onClick={() => {
              handleNext()
            }}
          >
            next question
          </button>
        </div>
      )}
    </main>
  )
}

export default App
