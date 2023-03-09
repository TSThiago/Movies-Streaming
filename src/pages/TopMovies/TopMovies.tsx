import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/Navbar";
import './style.scss'
import clock from '../../assets/clock.png'
import getTopMovies from "../../services/api/getTopMovies";
import { useEffect, useState } from "react";
import { IFilmList, Genre } from "../../types/dataListFilms.interface";
import getMoviesGenres from "../../services/api/getMoviesGenres";

const TopMovies = () => {
    const [viewMore, setViewMore] = useState(true)
    const [topFive, setTopFive] = useState<IFilmList[]>([])
    const [topMovies, setTopMovies] = useState<IFilmList[]>([])
    const [topOne, setTopOne] = useState<IFilmList>({
        background: '',
        title: '',
        tagsGenre: [],
        movieId: 0
    })
    const [genre, setGenre] = useState<Genre[]>([])

    useEffect(() => {
        getTopMovies()
            .then(function (topMovies) {
                setTopMovies(topMovies)
                setTopOne(topMovies[0])
                let index: number = 1
                let fiveMovies: IFilmList[] = []
                for (index; index < 5; index++) {
                    fiveMovies.push(topMovies[index])
                }
                setTopFive(fiveMovies)
            })
        getMoviesGenres()
        .then( function (genres) {
            setGenre(genres.genres)
        })
    }, [])

    const getGenreNames = (tags: number[]) => {
        const names = tags.map((tag) => {
            const genreName = genre.find((item) => item.id === tag);
            return genreName ? genreName.name : "";
        });
        return names;
    };

    return (
        <>
            <NavBar></NavBar>
            <section className="topMovies">
                {viewMore ? (
                    <>
                        <div className="topMoviesHeader">
                            <span>Top Movies</span>
                            <button onClick={() => setViewMore(false)}>View More</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="topMoviesHeader">
                            <span>Top Movies</span>
                            <button onClick={() => setViewMore(true)}>View Less</button>
                        </div>
                    </>
                )}

                <div className="movies">
                    {viewMore ? (
                        <>
                            <div className="firstMovie" style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500' + topOne.background + ')', backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                <div className="viewMoreCategories">
                                    {getGenreNames(topOne.tagsGenre).map(genre => {
                                        return (
                                            <div className="viewMoreCategory" >
                                                <span>{genre}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="viewMoreRunTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="viewMoreTitle">
                                    <span>{topOne.title}</span>
                                </div>
                            </div>
                            {topFive.map((movie: IFilmList) => {
                                return (
                                    <div key={movie.movieId} className="viewMoreMovie" style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500' + movie.background + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                        <div className="viewMoreCategories">
                                            {getGenreNames(movie.tagsGenre).map(genre => {
                                                return (
                                                    <div className="viewMoreCategory" >
                                                        <span>{genre}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="viewMoreRunTime">
                                            <img src={clock} alt="Clock icon" />
                                            <span>1hr 24mins</span>
                                        </div>
                                        <div className="viewMoreTitle">
                                            <span>{movie.title}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <>
                            {topMovies.map((topMovie: IFilmList) => {
                                return (
                                    <div key={topMovie.movieId} className="movie" >
                                        <div className="categories" style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500' + topMovie.background + ')', backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                            {getGenreNames(topMovie.tagsGenre).map(genre => {
                                                return (
                                                    <div className="category" >
                                                        <span>{genre}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {/* <div className="moviePhoto" >

                                        </div> */}
                                        <div className="runTime">
                                            <img src={clock} alt="Clock icon" />
                                            <span>1hr 24mins</span>
                                        </div>
                                        <div className="title">
                                            <span>{topMovie.title}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}

                </div>
            </section >
            <Footer></Footer>
        </>
    )
}

export default TopMovies;