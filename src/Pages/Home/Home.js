import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, MenuItem, TextField } from '@material-ui/core'
import "./Home.css"
import Categories from '../../Data/Categories'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const Home = ({name, setName, fetchQuestions}) => {

  const[category, setCategory] = useState("")
  const[difficulty, setDifficulty] = useState("")
  const[error, setError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = ()  => { 
        if(!name|| !category|| !difficulty) {
            setError(prevError => !prevError) 
            return;
        } else {
            setError(prevError => prevError)
            fetchQuestions(category, difficulty)
            navigate("/quiz");
        }
    }

  return (
    <div className='content'>
        <div className='settings'>
            <span style={{fontSize:25}}>Quiz Settings</span>
            <div className='settings_select'>

                {error && <ErrorMessage>Please fill in all fields</ErrorMessage>}

                <TextField 
                    style={{marginBottom: 25}}
                    color="inherit"
                    label='Enter your name' 
                    variant="outlined"
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField
                    select
                    style={{marginBottom: 30}}
                    color="inherit"
                    label="Select Category"
                    variant="outlined"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    { Categories.map(cat =>
                        <MenuItem
                            key={cat.category}
                            value={cat.value}
                        > {cat.category}
                        </MenuItem>
                       )
                    }
                </TextField>
                <TextField
                    select
                    style={{marginBottom: 30}}
                    color="inherit"
                    label="Select Difficulty"
                    variant="outlined"
                    onChange={(event) => setDifficulty(event.target.value)}
                    value={difficulty}
                >
                    <MenuItem key="Easy" value="easy">Easy</MenuItem>
                    <MenuItem key="Medium" value="medium">Medium</MenuItem>
                    <MenuItem key="Difficult" value="difficult">Difficult</MenuItem>
                </TextField>
                <Button 
                    variant="contained"
                    color="inherit"
                    size="large"
                    onClick={handleSubmit}
                > Start Quiz
                </Button>
            </div>
        </div>
        <img src="./quiz.svg" height="300" className='banner' alt="quiz" />
    </div>
  )
}

export default Home