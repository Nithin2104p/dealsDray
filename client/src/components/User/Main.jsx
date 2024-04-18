import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './main.css'
const Main = () => {
    return (
        <div className="hai">

            <h4 style={{ textAlign: "center", marginTop: "100px" }}>Login or SignUp to continue</h4>

            <div className='main'>

                <Link to="/register" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-danger">Login</Link>
            </div>
        </div>
    )
}

export default Main
