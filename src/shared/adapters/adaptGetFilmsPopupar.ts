import { Films, IFilmList } from '../../types/dataListFilms.interface'

const adaptGetFilmsPopupar = (film: Films) : IFilmList[] => {
    const adaptedList: IFilmList[] = film.results.map(item => {
        return {
            background: item.backdrop_path,
            title: item.original_title,
            tagsGenre: item.genre_ids,
            movieId: item.id,
            descrition: item.overview,
            rating: item.vote_average,
        }
    })

    return adaptedList
}

export default adaptGetFilmsPopupar
