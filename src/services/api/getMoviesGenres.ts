import React from 'react'
import { Genres } from '../../types/dataListFilms.interface'


const getMoviesGenres = async () => {
    const keyCode = "fc623a5ca96ebc475b73176b0c3d5b4b"

    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=fc623a5ca96ebc475b73176b0c3d5b4b&language=en-US`)
    const moviesGenre : Genres = await res.json()
    return moviesGenre

}

export default getMoviesGenres
