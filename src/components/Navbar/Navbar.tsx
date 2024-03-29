import { useEffect, useState } from 'react'
import './style.scss'
import searchIcon from '../../assets/search_icon.png'
import getMovies from '../../services/api/getTopMovies'
import { useSelector } from 'react-redux'
import { iState } from '../../types/redux.interface'
import { Link, useNavigate } from 'react-router-dom'
import store from '../../store'
import { setLogoutAction, setRemoveUserInfosAction } from '../../store/user/action'
import Swal from 'sweetalert2'
import { iUser } from '../../types/user.interface'


const NavBar : React.FC = () => {
    const isLogged = useSelector((state: iState) => state.user.isLogged)
    const userInfos = useSelector((state: iState) => state.user.user)
    const [user, setUser] = useState<iUser>({
        id: 0,
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phone: '',
        profilePic: ''
    })
    const [logoutVisible, setLogoutVisible] = useState(false)
    const [textInput, setTextInput] = useState<string>()
    const navigate = useNavigate()

    useEffect(() => {
        getMovies()
        setUser(userInfos)
    }, [])


    const logoutUser = () => {
        Swal.fire({
            text: 'Logout Successful!',
            icon: 'success',
            confirmButtonColor: 'black'
        })
        store.dispatch(setLogoutAction(false))
        store.dispatch(setRemoveUserInfosAction({
            id: 0,
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: '',
            profilePic: ''
        }))
        navigate("/sign")
    }

    const handleInput = (text: string) => {
        setTextInput(text)
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
                    <input onChange={(e) => handleInput(e.target.value)} type='text'></input>
                    <button><Link to={`/SearchMovies/:${textInput}`}><img src={searchIcon} alt='Search icon image'></img></Link></button>

                    {isLogged ? (
                        <div onMouseOver={() => setLogoutVisible(true)} onMouseOut={() => setLogoutVisible(false)} className='user'>
                            <img className='userImg' src={user.profilePic}></img>
                            {!logoutVisible ? (
                                <span>{user.firstName}  {user.lastName}</span>
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