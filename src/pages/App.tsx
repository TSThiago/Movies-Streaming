import '../styles/App.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from "../components/Footer/Footer"
import HomeGalleryFilms from '../components/HomeGalleryFilms/HomeFilms'

function App() {
  return (
    < div className="App" >
      <Navbar></Navbar>
      <HomeGalleryFilms/>
      <Footer />
    </div >
  )
}

export default App;
