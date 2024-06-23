import React, { useState, useContext } from 'react';
import { AuthContext } from '../../components/context/AuthContext';
import axios from 'axios';
import './login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate('/')
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };



    return (
        <div className="login-page">
            <div className="login-container">
                <h3>Login</h3>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className='login-input'
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className='login-input'
                />
                <button
                    onClick={handleClick}
                    className='login-button'
                    disabled={loading}
                >
                    Login
                </button>
                <span className='registerOption'>
                    Don't have an account? <Link to='/register'><b>Register</b></Link>
                </span>
                {error && <span className='login-error'>{error.message}</span>}
            </div>
        </div>
    );
};

export default Login;
