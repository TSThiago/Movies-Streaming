import NavBar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import "./style.scss"
import getMoviesPopular from '../../services/api/getMoviesPopular'
import { Genre, iFavoriteMovie, IFilmList, iMovieList, ResultList } from '../../types/dataListFilms.interface'
import getMoviesGenres from '../../services/api/getMoviesGenres'
import clock from "../../assets/clock.png"
import getDetails from '../../services/api/getDetails'
import moment from 'moment'
import { Link } from 'react-router-dom'
import getFavoriteMovies from '../../services/api/getFavoriteMovies'
import getTopMovies from '../../services/api/getTopMovies'
import { iUser } from '../../types/user.interface'
import getMovieDetails from '../../services/api/getMovieDetails'
import adaptFavoriteMovies from '../../shared/adapters/adaptFavoriteMovies'

const FavoriteMovies = () => {
    const [allFavoriteMoviesIds, setAllFavoriteMoviesids] = useState<iFavoriteMovie[]>([])
    const [userFavoriteMoviesIds, setUserFavoriteMoviesIds] = useState<iFavoriteMovie[]>([])
    const [userFavoriteMovies, setUserFavoriteMovies] = useState<iMovieList[]>([])
    const [response, setResponse] = useState<IFilmList[]>([])
    const [genre, setGenre] = useState<Genre[]>([])
    const [runtime, setRunTime] = useState<number[]>([])

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
        let user: iUser = JSON.parse(localStorage.getItem('user') || '{}')
        const filtederMovies = filterMovies(user.id)
        setUserFavoriteMoviesIds(filtederMovies)
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
        const adaptedFavoriteMovies: iMovieList = adaptFavoriteMovies(result)
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
            const genreName = genre.find((item) => item.id === tag.id);
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
                    <div className='card' key={item.movieId}>
                        <div className='subTitle genders'>
                            {getGenreNames(item.tagsGenre).map((name) => (
                                <span className='gender' key={name} >{name} </span>
                            ))}
                        </div>
                        <div className='containerImageFilm'>
                            <Link to={`/Movies/${item.movieId}/${getGenreNames(item.tagsGenre).join(',')}/${runtime[index]}`}><img className='imageFilm' src={`https://image.tmdb.org/t/p/w500/${item.background}`}
                                alt="imageHome" /></Link>

                        </div>
                        <span className='subTitle duration'>

                            <img src={clock} alt="imageDuration" />
                            <span>{moment.utc().startOf('day').add({ minutes: runtime[index] }).format('HH:mm')}mins</span>
                        </span>
                        <span className='subTitle title'>{item.title}</span>
                    </div>

                ))}
            </section>
            <Footer></Footer>
        </>
    )
}

export default FavoriteMovies;