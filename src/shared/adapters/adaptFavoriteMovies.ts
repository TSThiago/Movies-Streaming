import { iMovieList, Movie } from '../../types/dataListFilms.interface'

const adaptMovies = (film: Movie): iMovieList => {
    const adaptedMovies: iMovieList = {
            background: film.backdrop_path,
            title: film.original_title,
            tagsGenre: film.genres,
            movieId: film.id,
            descrition: film.overview,
            rating: film.vote_average,
    }

    return adaptedMovies;
}

export default adaptMovies;
