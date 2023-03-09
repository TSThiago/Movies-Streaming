import { useEffect, useState } from 'react'
import './style.scss'
import searchIcon from '../../assets/search_icon.png'
import dogo from '../../assets/dogo.jpg'
import getMovies from '../../services/api/getTopMovies'


const NavBar = () => {
    const [logged, setLogged] = useState(true)

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <>
            <header>
                <div className="links">
                    <a href='/' className="logo">Watchflix</a>
                    <a href='/'>Home</a>
                    <a href='/top_movies'>Top Movies</a>
                    <a href='/recently_watched'>Recently Watched</a>
                    <a href='/favorites'>Favorites</a>
                </div>
                <div className='user'>
                    <input type='text'></input>
                    <button onClick={() => setLogged(false)}><img src={searchIcon} alt='Search icon image'></img></button>
                    {logged ? (
                        <>
                            <img className='userImg' src={dogo}></img>
                            <span>Dogo</span>
                        </>
                    ): (
                        <>
                        <a href='/sign'>Login</a>
                        </>
                    )}

                </div>
            </header>
        </>
    )
}

export default NavBar;