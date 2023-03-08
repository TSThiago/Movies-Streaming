import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/Navbar";
import './style.scss'
import clock from '../../assets/clock.png'
import getMovies from "../../services/api/getTopMovies";
import { useState } from "react";

const TopMovies = () => {
    const [viewMore, setViewMore] = useState(true)

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
                            <div className="firstMovie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>The Ring's Lord</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                            <div className="movie">
                                <div className="category">
                                    <span>Fantasy</span>
                                </div>
                                <div className="runTime">
                                    <img src={clock} alt="Clock icon" />
                                    <span>1hr 24mins</span>
                                </div>
                                <div className="title">
                                    <span>Interspace</span>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default TopMovies;