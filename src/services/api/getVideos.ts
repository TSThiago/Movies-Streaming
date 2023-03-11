import adaptGetVideos from "../../shared/adapters/adaptGetVideos"
import { Videos } from "../../types/dataListFilms.interface"

const getVideos = async (id: string) => {
    const keyCode = "fc623a5ca96ebc475b73176b0c3d5b4b"
    
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${keyCode}&language=en-US`)
    const moviesVideo : Videos = await response.json()
    const adaptedResponse = adaptGetVideos(moviesVideo)
    return adaptedResponse
}

export default getVideos;