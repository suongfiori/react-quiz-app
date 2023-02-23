import React, {useState} from 'react'
import {decode} from "html-entities"
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { Button } from '@material-ui/core'
import "./Question.css"
import { useNavigate } from 'react-router-dom'

const Question = ({
  questions, 
  currentQuestion, 
  setCurrentQuestion,
  correct,
   options, 
   score,
   setScore
  }) => {

    const [selected, setSelected] = useState(null)
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    const max_question = questions.length;

    const getOptionClass = (option) => {
      if (selected === option && selected === correct) return "select";
      else if (selected === option && selected !== correct) return "wrong";
      else if (option === correct) return "select";
    };

    const handleCheck = (option) => {
      setSelected(option)
      if(option === correct) {
        setScore(prevScore => prevScore + 1)
      }
      setError(false)
    }

    const handleQuit = () => {
      setCurrentQuestion(0)
    }

    const handleNext = () => {
      if (currentQuestion >= max_question - 1) {
        navigate('/result');
      } else if (selected) {
        setCurrentQuestion(currentQuestion + 1);
        setSelected('');
      } else {
        setError(true);
      }
    };

  return (
    <div className='question'>
        <h3>Question {currentQuestion + 1}:</h3>
        <div className='current-quiz'>
            <p>{decode(questions[currentQuestion].question)}</p>

            <div className='options'>

            {error && <ErrorMessage>Please select your option first</ErrorMessage>}
            
            {options && options.map(option => (
                <button 
                    key={option}
                    className={`single-option ${selected && getOptionClass(option)}` }
                    // class name "single-option" is a general class for all answer options
                    // If "selected" is truthy, the expression evaluates to the result of handleSelect(i).
                    onClick={() => handleCheck(option)}
                    disabled={selected}
                >
                  {decode(option)}
                </button>
              ))}
            </div> 

            <div className='controls'>
              <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ width: 185 }}
                  href="/"  // quit = go back to the home screen
                  onClick={handleQuit}
              >
                Quit
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: 185 }}
                  onClick={handleNext}
              >
                Next Question
              </Button>
            </div>
        </div>
    </div>
  )
}

export default Question