export interface iFavoriteMovie {
    movieId: number,
    userId: number
}

export interface Videos {
    id:      number;
    results: Result[];
}

export interface Result {
    iso_639_1:    string;
    iso_3166_1:   string;
    name:         string;
    key:          string;
    site:         string;
    size:         number;
    type:         string;
    official:     boolean;
    published_at: Date;
    id:           string;
}

export interface IVideoList {
    key: string;
    type: string;
    site: string;
}

export interface IFilmList {
    background: string;
    title: string;
    tagsGenre: number[];
    movieId: number;
    descrition: string;
    rating: number;
}


export interface Films {
    page: number;
    results: ResultList[];
    total_results: number;
    total_pages: number;
}

export interface ResultList {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: Date;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: OriginalLanguage;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export enum OriginalLanguage {
    En = "en",
}

export interface Genres {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Details {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: Date;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}


