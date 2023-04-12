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
import getFavoriteMovies from '../../services/api/getFavoriteMovies'
import getTopMovies from '../../services/api/getTopMovies'
import getMovieDetails from '../../services/api/getMovieDetails'
import adaptMovies from '../../shared/adapters/adaptFavoriteMovies'
import { useSelector } from 'react-redux'
import { iState } from '../../types/redux.interface'

const FavoriteMovies = () => {
    const userInfos = useSelector((state: iState) => state.user.user)
    const [allFavoriteMoviesIds, setAllFavoriteMoviesids] = useState<iUserMovies[]>([])
    const [userFavoriteMoviesIds, setUserFavoriteMoviesIds] = useState<iUserMovies[]>([])
    const [userFavoriteMovies, setUserFavoriteMovies] = useState<iMovieList[]>([])
    const [response, setResponse] = useState<IFilmList[]>([])
    const [genre, setGenre] = useState<Genre[]>([])
    const [runtime, setRunTime] = useState<number[]>([])
    const text = null

    useEffect(() => {
        const fetchData = async () => {
            const topMovies = await getTopMovies()
            const resultFavoriteMovies = await getFavoriteMovies()
            const resultMovies = await getMoviesPopular()
            const resultGenre = await getMoviesGenres()
            setResponse(resultMovies.concat(topMovies))
            setGenre(resultGenre.genres)
            setAllFavoriteMoviesids(resultFavoriteMovies)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const filteredMovies = filterMovies(userInfos.id)
        setUserFavoriteMoviesIds(filteredMovies)
        const usersMovies = async () => {
            const favoriteMovies: iMovieList[] = await Promise.all(userFavoriteMoviesIds.map((item) => handleFavoriteMovies(item.movieId)))
            setUserFavoriteMovies(favoriteMovies)
        }
        usersMovies()
    }, [response])

    useEffect(() => {
        const duration = async () => {
            const runTimes = await Promise.all(userFavoriteMovies.map((item) => handleRunTime(item.movieId)))
            setRunTime(runTimes)
        }
        duration()
    }, [userFavoriteMovies])

    const handleFavoriteMovies = async (movieId: number) => {
        const result = await getMovieDetails(movieId)
        const adaptedFavoriteMovies: iMovieList = adaptMovies(result)
        return adaptedFavoriteMovies
    }

    const filterMovies = (userId: number) => {
        const filteredFavoriteMovies = allFavoriteMoviesIds.filter(movie => movie.userId === userId)
        return filteredFavoriteMovies
    }

    const handleRunTime = async (id: number) => {
        const result = await getDetails(id)
        return result
    }

    const getGenreNames = (tags: Genre[]) => {
        const names = tags.map((tag) => {
            let genreName = genre.find((item) => item.id === tag.id);
            return genreName ? genreName.name : "";
        });
        return names;
    };


    return (
        <>
            <NavBar></NavBar>
            <section className='containerFilms'>
                <div className='pageTitle'>
                    <span>Favorite Movies</span>

                </div>
                {userFavoriteMovies.map((item: iMovieList, index: number) => (
                    <Link to={`/Movies/${item.movieId}/${getGenreNames(item.tagsGenre).join(',')}/${runtime[index]}/${text}`}>
                        <div className='card' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + item.background + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width:'400px', height: '560px', borderRadius: '0'}} key={item.movieId}>
                            <div className=' movieGenders'>
                                {getGenreNames(item.tagsGenre).map((name) => (
                                    <span className='gender' key={name} >{name} </span>
                                ))}
                            </div>
                            <span className='subTitle movieDuration'>
                                <img src={clock} alt="imageDuration" />
                                <span>{moment.utc().startOf('day').add({ minutes: runtime[index] }).format('HH:mm')}mins</span>
                            </span>
                            <span className='subTitle movieTitle'>{item.title}</span>
                        </div>
                    </Link>
                ))}
            </section >
            <Footer></Footer>
        </>
    )
}

export default FavoriteMovies;