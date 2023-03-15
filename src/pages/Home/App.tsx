import './App.scss'
import Footer from "../../components/Footer/Footer"
import HomeGalleryFilms from '../../components/HomeGalleryFilms/HomeFilms'
import Navbar from '../../components/Navbar/Navbar'

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