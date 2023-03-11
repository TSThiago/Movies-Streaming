import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import TopMovies from './pages/TopMovies/TopMovies'
import './styles/index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp'

import Movies from './pages/movies/Movies'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/recently_watched' element={<TopMovies />} />
        <Route path='/top_movies' element={<TopMovies />} />
        <Route path='/favorites' element={<App />} />
        <Route path='/sign' element={<SignUp  />} />
        <Route path='/Movies/:id/:genre/:runTime' element={<Movies />} />
      </Routes>
    </Router>

  </React.StrictMode>,
)
