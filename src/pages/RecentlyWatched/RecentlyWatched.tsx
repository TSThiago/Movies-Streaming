import NavBar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import "./style.scss"
import getMoviesPopular from '../../services/api/getMoviesPopular'
import { Genre, iUserMovies, IFilmList, iMovieList } from '../../types/dataListFilms.interface'
import getMoviesGenres from '../../services/api/getMoviesGenres'
import clock from "../../assets/clock.png"
import getDetails from '../../services/api/getDetails'
import moment from 'moment'
import { Link } from 'react-router-dom'
import getTopMovies from '../../services/api/getTopMovies'
import { iUser } from '../../types/user.interface'
import getMovieDetails from '../../services/api/getMovieDetails'
import adaptMovies from '../../shared/adapters/adaptFavoriteMovies'
import getWatchedMovies from '../../services/api/getWatchedMovies'
import { useSelector } from 'react-redux'
import { iState } from '../../types/redux.interface'

const RecentlyWatched = () => {
    const userInfos = useSelector((state: iState) => state.user.user)
    const [allWatchedMoviesIds, setWatchedMoviesIds] = useState<iUserMovies[]>([])
    const [userWatchedMoviesIds, setUserWatchedMoviesIds] = useState<iUserMovies[]>([])
    const [userWatchedMovies, setUserWatchedMovies] = useState<iMovieList[]>([])
    const [response, setResponse] = useState<IFilmList[]>([])
    const [genre, setGenre] = useState<Genre[]>([])
    const [runTime, setRunTime] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const resultWatchedMovies = await getWatchedMovies()
            const topMovies = await getTopMovies()
            const resultMovies = await getMoviesPopular()
            const resultGenre = await getMoviesGenres()
            setWatchedMoviesIds(resultWatchedMovies)
            setResponse(resultMovies.concat(topMovies))
            setGenre(resultGenre.genres)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const filtederMovies = filterMovies(userInfos.id)
        setUserWatchedMoviesIds(filtederMovies)
        const usersMovies = async () => {
            const watchedMovies: iMovieList[] = await Promise.all(userWatchedMoviesIds.map((item) => handleWatchedMovies(item.movieId)))
            setUserWatchedMovies(watchedMovies.reverse())
        }
        usersMovies()
    }, [response])

    useEffect(() => {
        const duration = async () => {
            const runTimes = await Promise.all(userWatchedMovies.map((item) => handleRunTime(item.movieId)))
            setRunTime(runTimes)
        }
        duration()
    }, [userWatchedMovies])

    const handleWatchedMovies = async (movieId: number) => {
        const result = await getMovieDetails(movieId)
        const adaptedWatchedMovies: iMovieList = adaptMovies(result)
        return adaptedWatchedMovies
    }

    const filterMovies = (userId: number) => {
        const filteredWatchedMovies = allWatchedMoviesIds.filter(movie => movie.userId === userId)
        return filteredWatchedMovies
    }

    const handleRunTime = async (id: number) => {
        const result = await getDetails(id)
        return result
    }

    const getGenreNames = (tags: Genre[]) => {
        const names = tags.map((tag) => {
            const genreName = genre.find((item) => item.id === tag.id);
            return genreName ? genreName.name : "";
        });
        return names;
    };

    return (
        <>
            <NavBar></NavBar>
            <section className="topMovies">
                <div className="topMoviesHeader">
                    <span>Recently Watched</span>
                </div>
                <div className="movies">
                    {userWatchedMovies.map((movie: iMovieList, index: number) => {
                        return (
                            <Link to={`/Movies/${movie.movieId}/${getGenreNames(movie.tagsGenre).join(',')}/${runTime[index]}`}>
                                <div key={movie.movieId} className="movie" >
                                    <div className="categories" style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + movie.background + ')', backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                        {getGenreNames(movie.tagsGenre).map(genre => {
                                            return (
                                                <div className="category" >
                                                    <span>{genre}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="runTime">
                                        <img src={clock} alt="Clock icon" />
                                        <span>{moment.utc().startOf('day').add({ minutes: runTime[index] }).format('HH:mm')}</span>
                                    </div>
                                    <div className="title">
                                        <span>{movie.title}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section >

            <Footer></Footer>
        </>
    )
}

export default RecentlyWatched;