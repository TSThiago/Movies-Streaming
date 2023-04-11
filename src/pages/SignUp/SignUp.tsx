import { useState } from 'react'
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import './style.scss'
import { useFormik } from 'formik';
import { iUser, iLoginUser } from '../../types/user.interface';
import getUsers from '../../services/api/getUsers';
import store from '../../store';
import { setLoginAction, setUserInfosAction } from '../../store/user/action';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const SignUp = () => {
    const [signUp, setSignUp] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: '',
            profilePic: ''
        }, onSubmit: (values) => {
            let newUser: object = values
            let myInit = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            };
            fetch('https://retoolapi.dev/iNtNmX/users', myInit)
                .then(function (response) {
                    return response.json();
                })

            Swal.fire({
                text: ("User successfully registered!"),
                icon: 'success',
                confirmButtonColor: 'black'

            })
            setSignUp(false)

        }, validate: (values) => {
            const errors: { firstName?: string, lastName?: string, password?: string, email?: string, phone?: string, profilePic?: string } = {};
            if (!values.firstName) {
                errors.firstName = "Enter your name!"
            } else if (/[^a-zA-ZÀ-ü]/i.test(values.firstName)) {
                errors.firstName = "Invalid digits!"
            }

            if (!values.lastName) {
                errors.lastName = "Enter your last name!"
            } else if (/[^a-zA-ZÀ-ü]/i.test(values.lastName)) {
                errors.lastName = "Invalid digits!"
            }

            if (!values.password) {
                errors.password = "Enter your password!"
            } else if (values.password.length < 8) {
                errors.password = "Password too short!"
            }

            if (!values.email) {
                errors.email = "Enter your email!"
            }

            if (!values.phone) {
                errors.phone = "Enter your phone number!"
            } else if (!parseInt(values.phone)) {
                errors.phone = "Only numbers!"
            }

            if (!values.profilePic) {
                errors.profilePic = "Enter your profile picture URL!"
            }

            return errors;
        }
    })

    const loginUserAction = () => {
        store.dispatch(setLoginAction(true))
    }

    const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setUserEmail(e.currentTarget.value)
    }

    const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setUserPassword(e.currentTarget.value)
    }

    const setInfosAction = (user: iUser) => {
        store.dispatch(setUserInfosAction(user))
    }

    const handleUser = async () => {
        getUsers()
            .then(function (users) {
                let loginUser: iLoginUser = {
                    email: userEmail,
                    password: userPassword
                }
                let userFound: boolean = false
                users.forEach((user: iUser) => {
                    if (user.email === loginUser.email && user.password === loginUser.password && !userFound) {
                        loginUserAction()
                        Swal.fire({
                            text: 'Login Successful!',
                            icon: 'success',
                            confirmButtonColor: 'black'
                        })
                        userFound = true
                        setInfosAction(user)
                        navigate("/")
                    }
                })
                if (userFound === false) {
                    Swal.fire({
                        text: 'Email or Password is invalid!',
                        icon: 'error',
                        confirmButtonColor: 'black'
                    })
                }
            })

    }

    return (
        <>
            <NavBar></NavBar>

            {signUp ? (
                <>
                    <section className="signUpContainer" style={{height: '791px'}}>
                        <div className="signUpHeader">
                            <div onClick={() => setSignUp(true)} style={{ backgroundColor: '#111111' }} className='signUpBtn'>
                                <span>Sign up</span>
                            </div>
                            <div onClick={() => setSignUp(false)} style={{ backgroundColor: '#313131' }} className='loginBtn'>
                                <span>Log in</span>
                            </div>
                        </div>
                        <div className='signUp' >
                            <form onSubmit={formik.handleSubmit}>
                                <h2>Sign up</h2>
                                <div className='inputs'>
                                    <div className='smallInputs'>
                                        <label className='smallLabel' htmlFor="firstName">First Name</label>
                                        <input onChange={formik.handleChange} defaultValue={formik.values.firstName} className='smallInput' type="text" id='firstName' />
                                        <p>{formik.errors.firstName}</p>
                                    </div>
                                    <div className='smallInputs'>
                                        <label className='smallLabel' htmlFor="lastName">Last Name</label>
                                        <input onChange={formik.handleChange} defaultValue={formik.values.lastName} className='smallInput' type="text" id='lastName' />
                                        <p>{formik.errors.lastName}</p>
                                    </div>
                                </div>


                                <label htmlFor="password">Password</label>
                                <input onChange={formik.handleChange} defaultValue={formik.values.password} type="password" id='password' />
                                <p>{formik.errors.password}</p>
                                <label htmlFor="email">Email address</label>
                                <input onChange={formik.handleChange} defaultValue={formik.values.email} type="email" id='email' />
                                <p>{formik.errors.email}</p>
                                <div className='inputs'>
                                    <div className='smallInputs'>
                                        <label className='smallLabel' htmlFor="phone">Phone Number</label>
                                        <input onChange={formik.handleChange} defaultValue={formik.values.phone} className='smallInput' type='tel' id='phone' />
                                        <p>{formik.errors.phone}</p>
                                    </div>
                                    <div>
                                        <label className='smallLabel' htmlFor="picture">Profile Picture URL</label>
                                        <input onChange={formik.handleChange} defaultValue={formik.values.profilePic} className='smallInput' type="text" id='profilePic' />
                                        <p>{formik.errors.profilePic}</p>
                                    </div>
                                </div>
                                <button type='submit'>Sign up</button>
                            </form>

                        </div >
                    </section>
                </>

            ) : (
                <>
                    <section className="signUpContainer" style={{height: '538px'}}>
                        <div className="signUpHeader">
                            <div onClick={() => setSignUp(true)} style={{ backgroundColor: '#313131' }} className='signUpBtn'>
                                <span>Sign up</span>
                            </div>
                            <div onClick={() => setSignUp(false)} style={{ backgroundColor: '#111111' }} className='loginBtn'>
                                <span>Log in</span>
                            </div>
                        </div>
                        <div className='logIn'>
                            <div className='logInInputs'>
                                <h2>Log in</h2>
                                <label htmlFor="email">Email address</label>
                                <input onChange={handleEmail} defaultValue={userEmail} type="email" id='email' />
                                <label htmlFor="password">Password</label>
                                <input onChange={handlePassword} defaultValue={userPassword} type="password" id='password' />
                                <button onClick={handleUser}>Log in</button>
                            </div>

                        </div>
                    </section>
                </>
            )}
            <Footer></Footer>
        </>
    )
}

export default SignUp;