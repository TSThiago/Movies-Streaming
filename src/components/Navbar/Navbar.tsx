import { useEffect, useContext } from 'react'
import './style.scss'
import searchIcon from '../../assets/search_icon.png'
import dogo from '../../assets/dogo.jpg'
import getMovies from '../../services/api/getTopMovies'
import { StorageContext } from '../../contexts/StorageContext'
import { useSelector } from 'react-redux'
import { iState } from '../../types/redux.interface'
import {Link} from 'react-router-dom'
const NavBar = () => {
    const isLogged = useSelector((state : iState) => state.user.isLogged)

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <>
            <header>
                <div className="links">
                    <Link to='/' className="logo">Watchflix</Link>
                    <Link to='/'>Home</Link>
                    <Link to='/top_movies'>Top Movies</Link>
                    <Link to='/recently_watched'>Recently Watched</Link>
                    <Link to='/favorites'>Favorites</Link>
                </div>
                <div className='user'>
                    <input type='text'></input>
                    <button><img src={searchIcon} alt='Search icon image'></img></button>

                    {isLogged ? (
                        <>
                            <img className='userImg' src={dogo}></img>
                            <span>Dogo</span>
                        </>
                    ): (
                        <>
                        <Link to='/sign'>Login</Link>
                        </>
                    )}

                </div>
            </header>
        </>
    )
}

export default NavBar;