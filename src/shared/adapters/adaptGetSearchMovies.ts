import { ISearchMovies, SearchMovies } from "../../types/dataListFilms.interface"

const adaptGetSearchMovies =  (movies: SearchMovies): ISearchMovies[] => {
    const adaptedSearch: ISearchMovies[] = movies.results.map(item => {
        return {
            title: item.title,
            descrition: item.overview,
            genre: item.genre_ids,
            rating: item.vote_average,
            background: item.backdrop_path,
            id: item.id,
        }
    })

    return adaptedSearch
}

export default adaptGetSearchMovies