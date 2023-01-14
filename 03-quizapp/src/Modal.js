import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { correct, questions, closeModal } = useGlobalContext()
  return (
    <div
      style={{
        zIndex: 2,
      }}
    >
      <p>
        you answered {((correct / (questions.length - 1)) * 100).toFixed(0)}%
        answers correctly
      </p>
      <button
        onClick={() => {
          closeModal()
        }}
      >
        play again
      </button>
    </div>
  )
}

export default Modal
