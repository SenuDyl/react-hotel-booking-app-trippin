import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { AuthContext } from '../../components/context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './register.css'; // Import the CSS file

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useHistory hook

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/register", credentials); // Adjust API endpoint as per your backend
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate('/login'); // Redirect to home page or login page after successful registration
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                        className='register-input'
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className='register-input'
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className='register-input'
                        required
                    />
                    <button type="submit" className='register-button' disabled={loading}>Register</button>
                    <span className='loginOption'>
                        Already have an account? <Link to='/login'><b>Login</b></Link>
                    </span>
                </form>
                {error && <p className="error-message">{error.message}</p>}
            </div>
        </div>
    );
};

export default Register;
