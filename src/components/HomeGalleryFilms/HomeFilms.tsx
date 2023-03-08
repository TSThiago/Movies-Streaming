import React, { useEffect, useState } from 'react'
import "./style.scss"
import getMoviesPopular from '../../services/api/getMoviesPopular'
import { Genre, IFilmList } from '../../types/dataListFilms.interface'
import getMoviesGenres from '../../services/api/getMoviesGenres'
import clock from "../../assets/clock.png"

const HomeGalleryFilms = () => {

    const [response, setResponse] = useState<IFilmList[]>([])
    const [genre, setGenre] = useState<Genre[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const resultMovies = await getMoviesPopular()
            const resultGenre = await getMoviesGenres()
            setResponse(resultMovies)
            setGenre(resultGenre.genres)
        }
        fetchData()
    }, [])

    const getGenreNames = (tags: number[]) => {
        const names = tags.map((tag) => {
            const genreName = genre.find((item) => item.id === tag);
            return genreName ? genreName.name : "";
        });
        return names;
    };  

    return (

        <section className='containerFilms'>
            {response.map((item: IFilmList) => (
                <div className='card'>
                    <div className='subTitle genders'>
                        {getGenreNames(item.tagsGenre).map((name) => (
                            <span className='gender' key={name} >{name}</span>
                        ))}
                    </div>
                    <img className='imageFilm' src={`https://image.tmdb.org/t/p/w500/${item.background}`} alt="imageHome" />
                    <span className='subTitle duration'><img src={clock} alt="imageDuration" />1h30min</span>
                    <span className='subTitle title'>{item.title}</span>
                </div>
            ))}
        </section>
    )
}

export default HomeGalleryFilms
