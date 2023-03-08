import React, { useEffect, useState } from 'react'
import "./style.scss"
import getMoviesPopular from '../../services/api/getMoviesPopular'
import { IFilmList } from '../../types/dataListFilms.interface'
import getMoviesGenres from '../../services/getMoviesGenres'
import clock from "../../assets/clock.png"

const HomeGalleryFilms = () => {

    const [response, setResponse] = useState<IFilmList[]>([])



    useEffect(() => {
        const fetchData = async () => {
            const result = await getMoviesPopular()
            setResponse(result)
        }
        fetchData()
    }, [])


    console.log(response)
    getMoviesGenres()

    return (

        <section className='containerFilms'>
            {response.map((item: IFilmList) => (
                <div className='card'>
                    <span className='subTitle gender'>Action</span>
                    <img className='imageFilm' src={`https://image.tmdb.org/t/p/w500/${item.background}`} alt="imageHome" />
                    <span className='subTitle duration'><img src={clock} alt="imageDuration" />1h30min</span>
                    <span className='subTitle title'>{item.title}</span>
                </div>
            ))}
        </section>
    )

}


export default HomeGalleryFilms
