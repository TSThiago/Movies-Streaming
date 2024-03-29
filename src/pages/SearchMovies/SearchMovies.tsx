import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/Navbar/Navbar'
import getSearchMovies from '../../services/api/getSearchMovies'
import { Genre, IFilmList } from '../../types/dataListFilms.interface'
import "./style.scss"
import clock from "../../assets/clock.png"
import getMoviesGenres from '../../services/api/getMoviesGenres'
import getDetails from '../../services/api/getDetails'
import moment from 'moment'
export const SearchMovies = () => {

    const { text } = useParams<{ text: string }>()
    const [resultSearch, setResultSearch] = useState<IFilmList[]>([])
    const [genre, setGenre] = useState<Genre[]>([])
    const [runtime, setRunTime] = useState<number[]>([])


    useEffect(() => {
        const filter = async () => {
            const resultGenre = await getMoviesGenres()
            setGenre(resultGenre.genres)
            if (text) {
                const res = await getSearchMovies(text)
                setResultSearch(res)
            }
        }
        filter()
    }, [text])

    const getGenreNames = (tags: number[]) => {
        const names = tags.map((tag) => {
            const genreName = genre.find((item) => item.id === tag);
            return genreName ? genreName.name : null;
        });
        return names;
    };

    useEffect(() => {
        const duration = async () => {
            const runTimes = await Promise.all(resultSearch.map((item) => handleRunTime(item.movieId)))
            setRunTime(runTimes)
        }
        duration()
    }, [resultSearch])

    const handleRunTime = async (id: number) => {
        const result = await getDetails(id)
        return result
    }

    return (

        <>
            <NavBar />

            <section className='containerSearchMovies'>
                <div className='pageTitle'>
                    <span>Search Result:</span>

                </div>
                {resultSearch.map((item: IFilmList, index: number) => (
                    <div className='card' key={item.movieId}>
                        <div className='subTitle genders'>
                            {getGenreNames(item.tagsGenre).map((name) => (
                                <span className='gender' key={name} >{name}</span>
                            ))}
                        </div>
                        <div className='containerImageFilm'>
                            <Link to={`/Movies/${item.movieId}/${getGenreNames(item.tagsGenre).join(',')}/
                                ${runtime[index]}/${text}`}><img className='imageFilm'
                                    src={`https://image.tmdb.org/t/p/original/${item.background}`} alt="imageHome" /></Link>

                        </div>
                        <span className='subTitle duration'>
                            <img src={clock} alt="imageDuration" />
                            <span>{moment.utc().startOf('day').add({ minutes: runtime[index] }).format('HH:mm')}mins</span>
                        </span>

                        <span className='subTitle title'>{item.title}</span>
                    </div>

                ))}
            </section>

            <Footer />
        </>

    )
}
