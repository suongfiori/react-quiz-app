import React, {useEffect, useState} from 'react'
import { CircularProgress } from '@material-ui/core'
import "./Quiz.css"
import Question from '../../components/Question/Question'

const Quiz = ({ name, questions, score, setScore, yellow }) => {
  const[options, setOptions] = useState()
  const[currentQuestion, setCurrentQuestion] = useState(0) //current question is part of an array and initialized as the first element of the array

  const handleShuffle = (array) => {
    return array.sort((a, b) => 0.5 - Math.random());
  }

  useEffect(() => {
    setOptions(
      questions && 
        handleShuffle([
        questions[currentQuestion]?.correct_answer, //The "?": if there is any current question then give the correct answer
        ...questions[currentQuestion]?.incorrect_answers //If there is any current question then give the incorrect answers
        ]))
  }, [questions, currentQuestion])

  return (
    <div className='quiz'>
       <span className='subtitle'>Welcome, {name}!</span>
       {
          questions? (
          <>
            <div className='quiz-info'>
                <span className='category-info'>{questions[currentQuestion].category}</span>
                <span className='score-info'>Score: {score}</span>
            </div>
                <Question //chổ này phải send đầy đủ thì qua child component mới lấy làm tiếp được
                    questions={questions}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    options={options}
                    setOptions={setOptions}
                    correct={questions[currentQuestion]?.correct_answer}
                    score={score}
                    setScore={setScore}
                />
            
          </>
          ) : (
          <CircularProgress
              style={{margin: 100}}
              size={100}
              thickness={1}
              color="inherit"
              label="Page loading..."/>
          )}
    </div>
  )
}

export default Quiz   