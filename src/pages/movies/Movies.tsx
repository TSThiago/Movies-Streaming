import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/Navbar/Navbar'
import getMoviesPopular from '../../services/api/getMoviesPopular'
import { IFilmList, IVideoList } from '../../types/dataListFilms.interface'
import "./style.scss"
import heart from "../../assets/heart.svg"
import btnPlay from "../../assets/btnPlay.svg"
import btnPlayShadow from "../../assets/btnPlay2.svg"
import circle from "../../assets/circleContainer.svg"
import iconPlay from "../../assets/iconPlay.svg"
import getVideos from '../../services/api/getVideos'

const Movies = () => {

    const { id, genre, runTime } = useParams<{ id: string, genre: string, runTime: string }>();
    const genres = genre ? genre.split(', ') : [];
    const [response, setResponse] = useState<IFilmList[]>([])
    const [film, setFilm] = useState<IFilmList[]>([])
    const [responseVideos, setResponseVideos] = useState<IVideoList[]>([])
    const [moviesVideos, setMoviesVideos] = useState<IVideoList[]>([])


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
                const result = await getVideos(id)
                setResponseVideos(result)
                if (res) {
                    setFilm([res])
                }
            }
        }
        filmDetails()
    }, [id, response])

    useEffect(() => {
        const filterVideos = async () => {
            const type = responseVideos.filter(item => item.type === "Trailer")
            setMoviesVideos(type)
        }
        filterVideos()
    }, [responseVideos])

    console.log(responseVideos)
    console.log(moviesVideos)

    return (
        <>
            <NavBar />
            {film.map((item) => (
                <section className='containerFilm'>
                    <div className='Film'>
                        <div className='imageFilm'>
                            <img className='image' src={`https://image.tmdb.org/t/p/w500/${item.background}`} alt="imageFilm" />
                            <div>
                                <img className='btnPlay' src={btnPlay} alt="buttonPlay" />
                                <img className='btnPlayShadow' src={btnPlayShadow} alt="buttonPlayShadow" />
                                <img className='circleContainer' src={circle} alt="circleContainer" />
                                <img className='iconPlay' src={iconPlay} alt="iconPlay" />
                            </div>
                        </div>

                        <div className='details'>
                            <span className='title'>{item.title}</span>
                            <span className='descrition'>{item.descrition}</span>
                            <span>Genre: {genres}</span>
                            <span>Duration: {runTime ? moment.utc().startOf('day').add({ minutes: parseInt(runTime) }).format('HH:mm') : ''}mins</span>
                            <span>Rating: {item.rating}</span>
                            <span><img className='btnFavorites' src={heart} alt="heartFavorites" /></span>
                        </div>
                        
                        <div className='trailers'>
                        <h2>Trailers:</h2>
                            {moviesVideos.map((item) => (
                                <a target="_blank" href={`https://www.youtube.com/watch?v=${item.key}`} className='trailer'>
                                    <img src={`https://img.youtube.com/vi/${item.key}/maxresdefault.jpg`} alt="imageTrailer" />
                                </a>
                            ))}                                                  
                        </div>
                    </div>
                </section>
            ))}
            <Footer />
        </>
    )
}
export default Movies