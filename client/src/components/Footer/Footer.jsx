import React from 'react'
import './Footer.css'
import footer from '../Assets/DealsdrayFooter.png'
const Footer = () => {
    return (
        <div className="x">
            <hr />
            <div className='footer'>
                <img src={footer} alt="" />
                <div className='bottom'>
                    <ul style={{ listStyle: "none" }}>
                        <a href="https://www.dealsdray.com/" style={{ textDecoration: "none" }}><li>About</li></a>
                        <a href="https://www.dealsdray.com/" style={{ textDecoration: "none" }}><li>Contact</li></a>
                        <a href="https://www.dealsdray.com/" style={{ textDecoration: "none" }}><li>Company</li></a>
                        <a href="http://nithinp.netlify.app" style={{ textDecoration: "none" }}><li>PortFolio</li></a>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
