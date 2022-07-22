import React, { useContext } from 'react'
import './../../../styles/App.css'
import { NavLink } from 'react-router-dom';
import MyButton from './../button/MyButton'
import {AuthContext} from './../../../context/context'

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton style={{border: '1px solid #fff', color: '#fff'}} onClick={logout}>
                Log out
            </MyButton>
            <div className='navbar__links'>
                <NavLink to='/posts'>Posts</NavLink>
                <NavLink to='/about'>About</NavLink>
            </div>
        </div>
    )
}

export default Navbar