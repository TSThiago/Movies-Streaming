import React, { useEffect, useState } from 'react'
import "./style.scss"
import getMoviesPopular from '../../services/api/getMoviesPopular'
import adaptGetFilmsPopupar from '../../shared/adapters/adaptGetFilmsPopupar'
import { IFilmList } from '../../types/dataListFilms.interface'

const HomeGalleryFilms = () => {

    const [response, setResponse] = useState<IFilmList[]>([])

    useEffect(() => {


        
    })

    getMoviesPopular()   

    return (

        <section className='containerFilms'>
            <div className='card'>
                <span className='subTitle gender'>TAG GENERO</span>
                <span className='subTitle duration'>DURAÇÃO</span>
                <span className='subTitle title'>TITULO</span>
            </div>
        </section>
    )

}


export default HomeGalleryFilms
