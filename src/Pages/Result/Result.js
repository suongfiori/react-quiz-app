import React, {useEffect} from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';

const Result = ({name, score, questions}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  const averageScore = questions.length / 2
  return (
    <div className='result'>
        <div>
            <h3>{score > averageScore ? "Well done" : "Not too bad"}, {name}</h3>
            <span className='score-info'>Your scored: {score} / {questions.length} questions!</span>
        </div>
        <Button
            href="/"
            color='secondary'
            size='large'
            variant="contained"
            style={{ alignSelf: "center", margin: 30}}
        >
            Back to Homepage
        </Button>
    </div>
  )
}

export default Result