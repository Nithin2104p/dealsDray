import React from 'react'
import logo from '../Assets/dealsdray.png'
import './Navbar.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const Navbar = () => {
    return (
        <div className='z'>
            <div className='navbar'>
                <div className="left">
                    <Link to={'/'}><img src={logo} alt="" className='float-right' /></Link>
                </div>
                <div className="right">
                    <ul style={{ listStyle: "none" }}>
                        <Link to={'/'} style={{ textDecoration: "none" }}><li >Home</li></Link>
                        <Link to={'/posts/create/'} style={{ textDecoration: "none" }}><li>Create</li></Link>
                        <Link to={'/'} style={{ textDecoration: "none" }}><li>List</li></Link>
                        <a href="http://nithinp.netlify.app" style={{ textDecoration: "none" }}><li>PortFolio</li></a>
                    </ul>

                </div>

            </div>
            <hr />
        </div>
    )
}

export default Navbar
