import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import TopMovies from './pages/TopMovies/TopMovies'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
