import React from 'react'
import { Details } from '../../types/dataListFilms.interface'


const getDetails = async (id: number) => {
    const keyCode = "fc623a5ca96ebc475b73176b0c3d5b4b"

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${keyCode}&language=en-US`)
    const details : Details = await res.json()
    console.log(details)
    const result = details.runtime
    return result

}

export default getDetails