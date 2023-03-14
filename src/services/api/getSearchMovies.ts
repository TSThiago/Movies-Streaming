import adaptGetSearchMovies from "../../shared/adapters/adaptGetSearchMovies"
import { SearchMovies } from "../../types/dataListFilms.interface"

const getSearchMovies = async (text: string) => {
    const keyCode = "fc623a5ca96ebc475b73176b0c3d5b4b"
    
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keyCode}&language=en-US&query=${text}&page=1&
    include_adult=false`)
    const searchMovies : SearchMovies = await response.json()
    const adaptedResponse = adaptGetSearchMovies(searchMovies)
    return adaptedResponse
}

export default getSearchMovies;