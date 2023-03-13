import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/Navbar/Navbar'
import getMoviesPopular from '../../services/api/getMoviesPopular'
import getTopMovies from '../../services/api/getTopMovies'
import { iUserMovies, IFilmList, IVideoList } from '../../types/dataListFilms.interface'
import "./style.scss"
import heart from "../../assets/heart.svg"
import btnPlay from "../../assets/btnPlay.svg"
import btnPlayShadow from "../../assets/btnPlay2.svg"
import circle from "../../assets/circleContainer.svg"
import iconPlay from "../../assets/iconPlay.svg"
import getVideos from '../../services/api/getVideos'
import { iUser } from '../../types/user.interface'
import { useSelector } from 'react-redux'
import { iState } from '../../types/redux.interface'

const Movies = () => {
    const { id, genre, runTime } = useParams<{ id: string, genre: string, runTime: string }>();
    const genres = genre ? genre.split(', ') : [];
    const [response, setResponse] = useState<IFilmList[]>([])
    const [film, setFilm] = useState<IFilmList[]>([])
    const [responseVideos, setResponseVideos] = useState<IVideoList[]>([])
    const [moviesVideos, setMoviesVideos] = useState<IVideoList[]>([])
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            const popularMovies = await getMoviesPopular()
            const topMovies = await getTopMovies()
            setResponse(popularMovies.concat(topMovies))
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

    const watchMovie = (movie: IFilmList, userId: number) => {
        if (userId === null) {
            navigate('/sign')
        } else {
            let watchedMovie: iUserMovies = {
                movieId: movie.movieId,
                userId: userId
            }
            let myInit = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(watchedMovie)
            };
            fetch('https://apigenerator.dronahq.com/api/-B7mDXTe/WatchedMovies', myInit)
                .then(function (response) {
                    return response.json();
                })
            navigate('/recently_watched')
        }

    }

    const addToFavorites = (movie: IFilmList, userId: number) => {
        let newFavoriteMovie: iUserMovies = {
            movieId: movie.movieId,
            userId: userId
        }
        let myInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFavoriteMovie)
        };
        fetch('https://apigenerator.dronahq.com/api/4sHK6s2W/users_favorite', myInit)
            .then(function (response) {
                return response.json();
            })
    }

    const getUserId = () => {
        const user: iUser = JSON.parse(localStorage.getItem('user') || '')
        const userId = user.id
        return userId
    }

    return (
        <>
            <NavBar />
            {film.map((item) => (
                <section key={item.movieId} className='containerFilm' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500/' + item.background, backgroundSize: '100vw', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <div  className='Film'>
                        <div className='imageFilm'>
                            {/* <img className='image' src={`https://image.tmdb.org/t/p/w500/${item.background}`} alt="imageFilm" /> */}
                            <div>
                                <img className='btnPlay' src={btnPlay} alt="buttonPlay" />
                                <img className='btnPlayShadow' src={btnPlayShadow} alt="buttonPlayShadow" />
                                <img onClick={() => watchMovie(item, getUserId())} className='circleContainer' src={circle} alt="circleContainer" />
                                <img className='iconPlay' src={iconPlay} alt="iconPlay" />
                            </div>
                        </div>

                        <div className='details'>
                            <span className='title'>{item.title}</span>
                            <span className='descrition'>{item.descrition}</span>
                            <span>Genre: {genres}</span>
                            <span>Duration: {runTime ? moment.utc().startOf('day').add({ minutes: parseInt(runTime) }).format('HH:mm') : ''}mins</span>
                            <span>Rating: {item.rating}</span>
                            <span onClick={() => addToFavorites(item, getUserId())}>< img className='btnFavorites' src={heart} alt="heartFavorites" /></span>
                        </div>

                        <div className='trailers'>
                            <h2>Trailers:</h2>
                            {moviesVideos.map((item) => (
                                <a key={item.key} target="_blank" href={`https://www.youtube.com/watch?v=${item.key}`} className='trailer'>
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
