import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import QuizPage from './Pages/QuizPage/QuizPage';
import Result from './Pages/Result/Result';

function App() {
  const[name, setName] = useState("") 
  const[questions, setQuestions] = useState()
  const[score, setScore] = useState(0)

  const fetchQuestions = (category, difficulty) => {
      fetch(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`)
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }

  return ( 
    <BrowserRouter>
      <div className= "App" style={{backgroundColor: "#FFD600"}}>
        <Header />
        <Routes>
            <Route path="/" 
              element={<Home 
                  name={name} 
                  setName={setName} 
                  fetchQuestions={fetchQuestions} 
              />}>
            </Route>
            <Route path="/quiz" 
              element={<QuizPage
                  name={name} 
                  questions={questions}
                  score={score}
                  setScore={setScore}
                  setQuestions={setQuestions}
              />}>
              </Route>
            <Route path="/result" 
              element={<Result
                name={name} 
                score={score}
                questions={questions}
              />}>
              </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
