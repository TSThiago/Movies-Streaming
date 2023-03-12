import { useEffect, useState } from 'react'
import './style.scss'
import searchIcon from '../../assets/search_icon.png'
import dogo from '../../assets/dogo.jpg'
import getMovies from '../../services/api/getTopMovies'
import { useSelector } from 'react-redux'
import { iState } from '../../types/redux.interface'
import { Link, useNavigate } from 'react-router-dom'
import store from '../../store'
import { setLogoutAction } from '../../store/user/action'

const NavBar = () => {
    const isLogged = useSelector((state: iState) => state.user.isLogged)
    const [logoutVisible, setLogoutVisible] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        getMovies()
    }, [])


    const logoutUser = () => {
        localStorage.setItem('user', JSON.stringify(null))
        store.dispatch(setLogoutAction(false))
        navigate("/sign")
    }

    return (
        <>
            <header>
                <div className="links">
                    <Link to='/' className="logo">Watchflix</Link>
                    <Link to='/'>Home</Link>
                    <Link to='/top_movies'>Top Movies</Link>
                    {isLogged ? (
                        <>
                            <Link to='/recently_watched'>Recently Watched</Link>
                            <Link to='/favorites'>Favorites</Link>
                        </>
                    ) : null}

                </div>
                <div className='searchBar'>
                    <input type='text'></input>
                    <button><img src={searchIcon} alt='Search icon image'></img></button>

                    {isLogged ? (
                        <div onMouseOver={() => setLogoutVisible(true)} onMouseOut={() => setLogoutVisible(false)} className='user'>
                            <img className='userImg' src={dogo}></img>
                            {!logoutVisible ? (
                                <span >Thiago Shibanuma</span>
                            ) : (
                                <span onClick={logoutUser} style={{ cursor: 'pointer' }}>Log Out</span>
                            )}

                        </div>
                    ) : (
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