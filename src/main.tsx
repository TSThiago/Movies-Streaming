import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import TopMovies from './pages/TopMovies/TopMovies'
import './styles/index.scss'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import store from './store'
import SignUp from './pages/SignUp/SignUp'
import Movies from './pages/movies/Movies'
import { Provider } from 'react-redux'
import RecentlyWatched from './pages/RecentlyWatched/RecentlyWatched'
import FavoriteMovies from './pages/FavoriteMovies/FavoriteMovies'
import { SearchMovies } from './pages/SearchMovies/SearchMovies'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/recently_watched' element={<RecentlyWatched />} />
        <Route path='/top_movies' element={<TopMovies />} />
        <Route path='/favorites' element={<FavoriteMovies />} />
        <Route path='/sign' element={<SignUp  />} />
        <Route path='/Movies/:id/:genre/:runTime/:text' element={<Movies />} />
        <Route path='/SearchMovies/:text' element={<SearchMovies/>}/>
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>,
)
