import { useState } from 'react'
import './Navbar.scss'
import searchIcon from '../../assets/search_icon.png'
import dogo from '../../assets/dogo.jpg'

const NavBar = () => {
    const [logged, setLogged] = useState(true)

    return (
        <>
            <header>
                <div className="links">
                    <a className="logo">Watchflix</a>
                    <a>Home</a>
                    <a>Movies</a>
                    <a>Recently Watch</a>
                    <a>Favorites</a>
                </div>
                <div className='user'>
                    <input type='text'></input>
                    <button><img src={searchIcon} alt='Search icon image'></img></button>
                    {logged ? (
                        <>
                            <img className='userImg' src={dogo}></img>
                            <span>Dogo</span>
                        </>
                    ): (
                        <>
                        <a >Login</a>
                        </>
                    )}

                </div>
            </header>
        </>
    )
}

export default NavBar;