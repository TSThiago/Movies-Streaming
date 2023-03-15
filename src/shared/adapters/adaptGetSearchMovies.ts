import { IFilmList, SearchMovies } from "../../types/dataListFilms.interface"

const adaptGetSearchMovies =  (movies: SearchMovies): IFilmList[] => {
    const adaptedSearch: IFilmList[] = movies.results.map(item => {
        return {
            background: item.backdrop_path,
            title: item.title,
            tagsGenre: item.genre_ids,
            movieId: item.id,
            descrition: item.overview,
            rating: item.vote_average,
        }
    })

    return adaptedSearch
}

export default adaptGetSearchMovies