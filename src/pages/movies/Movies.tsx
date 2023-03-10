import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/Navbar/Navbar'
import getMoviesPopular from '../../services/api/getMoviesPopular'
import { IFilmList } from '../../types/dataListFilms.interface'
import "./style.scss"

const Movies = () => {

    const { id, genre } = useParams<{id: string, genre: string }>();
    const genres = decodeURIComponent(genre).split(',');
    const [response, setResponse] = useState<IFilmList[]>([])
    const [film, setFilm] = useState<IFilmList[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const resultMovies = await getMoviesPopular()
            setResponse(resultMovies)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const filmDetails = async () => {
            if (id) {
                const res = response.find(item => item.movieId === parseInt(id))
                if (res) {
                    setFilm([res])
                }
            }
        }
        filmDetails()
    }, [id, response])

    console.log(film)


    return (
        <>
            <NavBar />
            <section className='containerFilm'>

            </section>
            <Footer />
        </>
    )
}
export default Movies
