import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/Navbar/Navbar'
import getMoviesPopular from '../../services/api/getMoviesPopular'
import getTopMovies from '../../services/api/getTopMovies'
import { iUserMovies, IFilmList, IVideoList, iApiMovies } from '../../types/dataListFilms.interface'
import "./style.scss"
import heart from "../../assets/heart.svg"
import playButton from "../../assets/playButton.png"
import getVideos from '../../services/api/getVideos'
import { iUser } from '../../types/user.interface'
import Swal from 'sweetalert2'
import getWatchedMovies from '../../services/api/getWatchedMovies'
import getFavoriteMovies from '../../services/api/getFavoriteMovies'
import { useSelector } from 'react-redux'
import { iState } from '../../types/redux.interface'


import redHeart from '../../assets/redHeart.png'

import getSearchMovies from '../../services/api/getSearchMovies'

const Movies = () => {
    const isLogged = useSelector((state: iState) => state.user.isLogged)
    const [favorite, setFavorite] = useState(false)
    const { id, genre, runTime, text} = useParams<{ id: string, genre: string, runTime: string, text: string }>();

    const genres = genre ? genre.split(', ') : [];
    const [response, setResponse] = useState<IFilmList[]>([])
    const [film, setFilm] = useState<IFilmList[]>([])
    const [watchedMovies, setWatchedMovies] = useState<iApiMovies[]>([])
    const [favoriteMovies, setFavoriteMovies] = useState<iApiMovies[]>([])
    const [responseVideos, setResponseVideos] = useState<IVideoList[]>([])
    const [moviesVideos, setMoviesVideos] = useState<IVideoList[]>([])
    const navigate = useNavigate()


    useEffect(() => {
        getFavoriteMovies()
            .then(function (moviesFavorited) {
                setFavoriteMovies(moviesFavorited)
            })
        getWatchedMovies()
            .then(function (moviesWatched) {
                setWatchedMovies(moviesWatched)
            })
        const fetchData = async () => {
            const popularMovies = await getMoviesPopular()
            const topMovies = await getTopMovies()
            let resultSearch : IFilmList[] = []
            if(text){
                resultSearch = await getSearchMovies(text)  
            }
            setResponse(popularMovies.concat(topMovies).concat(resultSearch))
        }
        fetchData()
    }, [])

    useEffect(() => {
        getFavoriteMovies()
            .then(function (moviesFavorited) {
                setFavoriteMovies(moviesFavorited)
            })
    }, [favorite])

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
        let watchedMovie: iUserMovies = {
            movieId: movie.movieId,
            userId: userId
        }
        if (!!movie && !!userId) {
            watchedMovies.map((watchedMovie) => {
                if (watchedMovie.movieId === movie.movieId && watchedMovie.userId === userId) {
                    fetch('https://apigenerator.dronahq.com/api/-B7mDXTe/WatchedMovies/' + watchedMovie.id, { method: 'DELETE' })
                        .then(res => res.json())
                }
            })
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
            Swal.fire({
                text: ("Movie Watched!"),
                icon: 'success',
                confirmButtonColor: 'black'
            })
        } else {
            Swal.fire({
                text: ("Do the Login!"),
                icon: 'error',
                confirmButtonColor: 'black'
            })
            navigate('/sign')
        }
    }

    const addToFavorites = (movie: IFilmList, userId: number) => {
        if (!isLogged) {
            Swal.fire({
                text: ("Do the Login!"),
                icon: 'error',
                confirmButtonColor: 'black'
            })
            navigate('/sign')
        } else {
            let favMovie: iUserMovies = {
                movieId: movie.movieId,
                userId: userId
            }
            let myInit = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favMovie)
            };
            fetch('https://apigenerator.dronahq.com/api/4sHK6s2W/users_favorite', myInit)
                .then(function (response) {
                    return response.json();
                })
            setFavorite(true)
            Swal.fire({
                text: ("Added do Favorites!"),
                icon: 'success',
                confirmButtonColor: 'black'
            })
        }

    }

    const removeFromFavorite = (movie: IFilmList) => {
        favoriteMovies.map((favMovie) => {
            if (favMovie.movieId === movie.movieId) {
                console.log(favMovie)
                fetch('https://apigenerator.dronahq.com/api/4sHK6s2W/users_favorite/' + favMovie.id, { method: 'DELETE' })
                    .then(res => res.json())
            }
        })
        setFavorite(false)
        Swal.fire({
            text: ("Removed from Favorites!"),
            icon: 'success',
            confirmButtonColor: 'black'
        })
    }

    const getUserId = (): number | null => {
        if (!isLogged) {
            return null
        } else {
            const user: iUser = JSON.parse(localStorage.getItem('user') || '')
            const userId = user.id
            return userId
        }
    }

    return (
        <>
            <NavBar />
            {film.map((item) => (
                <section key={item.movieId} className='containerFilm' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + item.background, backgroundSize: '100vw', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <div className='Film'>
                        <div className='imageFilm'>
                            <div>
                                <img onClick={() => watchMovie(item, getUserId())} className='circleContainer' src={playButton} alt="circleContainer" />
                            </div>
                        </div>

                        <div className='details'>
                            <span className='title'>{item.title}</span>
                            <span className='descrition'>{item.descrition}</span>
                            <span>Genre: {genres}</span>
                            <span>Duration: {runTime ? moment.utc().startOf('day').add({ minutes: parseInt(runTime) }).format('HH:mm') : ''}mins</span>
                            <span>Rating: {item.rating}</span>
                            {!favorite ? (
                                <button onClick={() => addToFavorites(item, getUserId())}>< img className='btnFavorites' src={heart} alt="heartFavorites" /></button>
                            ) : (
                                <button onClick={() => removeFromFavorite(item)}>< img className='btnFavorites' src={redHeart} alt="heartFavorites" /></button>
                            )}

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
