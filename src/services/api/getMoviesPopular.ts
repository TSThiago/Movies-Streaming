import adaptGetFilmsPopupar from "../../shared/adapters/adaptGetFilmsPopupar"
import { Films} from "../../types/dataListFilms.interface"

const getMoviesPopular = async () => {
    const keyCode = "fc623a5ca96ebc475b73176b0c3d5b4b"
    
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${keyCode}&language=en-US&page=1`)
    const moviesPopular : Films = await response.json()
    // console.log(moviesPopular)
    const adaptedResponse = adaptGetFilmsPopupar(moviesPopular)
    
    return adaptedResponse
}

export default getMoviesPopular;