import React, { useEffect, useState } from 'react'
import "./style.scss"
import getMoviesPopular from '../../services/api/getMoviesPopular'
import { Genre, IFilmList } from '../../types/dataListFilms.interface'
import getMoviesGenres from '../../services/api/getMoviesGenres'
import clock from "../../assets/clock.png"
import getDetails from '../../services/api/getDetails'
import moment from 'moment'
import { Link } from 'react-router-dom'

const HomeGalleryFilms = () => {

    const [response, setResponse] = useState<IFilmList[]>([])
    const [genre, setGenre] = useState<Genre[]>([])
    const [runtime, setRunTime] = useState<number[]>([])
    const text = null

    useEffect(() => {
        const fetchData = async () => {
            const resultMovies = await getMoviesPopular()
            const resultGenre = await getMoviesGenres()
            setResponse(resultMovies)
            setGenre(resultGenre.genres)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const duration = async () => {
            const runTimes = await Promise.all(response.map((item) => handleRunTime(item.movieId)))
            setRunTime(runTimes)
        }
        duration()
    }, [response])

    const handleRunTime = async (id: number) => {
        const result = await getDetails(id)
        return result
    }

    const getGenreNames = (tags: number[]) => {
        const names = tags.map((tag) => {
            const genreName = genre.find((item) => item.id === tag);
            return genreName ? genreName.name : "";
        });
        return names;
    };

    return (
        <section className='containerFilmsHome'>
            <div className='pageTitle'>
                <span>Home</span>
            </div>
            {response.map((item: IFilmList, index: number) => (
                <Link to={`/Movies/${item.movieId}/${getGenreNames(item.tagsGenre).join(',')}/${runtime[index]}/${text}`}>
                    <div className='card' key={item.movieId} style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + item.background + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                        <div className='subTitle genders'>
                            {getGenreNames(item.tagsGenre).map((name) => (
                                <span className='gender' key={name} >{name} </span>
                            ))}
                        </div>
                        <div className='subTitle duration'>
                            <img src={clock} alt="imageDuration" />
                            <span>{moment.utc().startOf('day').add({ minutes: runtime[index] }).format('HH:mm')}mins</span>
                        </div>
                        <span className='subTitle title'>{item.title}</span>
                    </div>
                </Link>
            ))}
        </section>
    )
}

export default HomeGalleryFilms