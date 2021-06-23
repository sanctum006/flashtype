import React from 'react';
import './Nav.css';
import logo from './../../Assets/logo.png'

const Nav = () => {
    return <div className="nav-container">
        <div className="nav-left">
            <img src={logo} alt="logo" className="flash-logo" />
            <p className="flash-logo-text">FlashType</p>
        </div>

        <div className="nav-right">
            <a href="google.in" className="nav-aam-link">AAM</a>
        </div>
    </div>;
}

export default Nav;