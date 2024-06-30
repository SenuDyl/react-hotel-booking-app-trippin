import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/');
        setDropdownOpen(false);
    };
    const handleNavigate = () => {
        setDropdownOpen(false);
        navigate('/profile')
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">Trippin</span>
                </Link>
                <div className="navItems">
                    <div className="navList">
                        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                            <span className="navItem">Hotels</span>
                        </Link>
                        <Link to="/restaurants" style={{ color: "inherit", textDecoration: "none" }}>
                            <span className="navItem">Restaurants</span>
                        </Link>
                        <Link to="/attractions" style={{ color: "inherit", textDecoration: "none" }}>
                            <span className="navItem">Attractions</span>
                        </Link>
                        <Link to="/activities" style={{ color: "inherit", textDecoration: "none" }}>
                            <span className="navItem">Activities</span>
                        </Link>
                    </div>
                    {user ? (
                        <div className="navUser">
                            <span className="navUsername" onClick={handleDropdownToggle}>
                                {user.username}
                            </span>
                            {dropdownOpen && (
                                <div className="dropdownMenu">
                                    <span className="dropdownItem" onClick={handleNavigate}>
                                        Profile
                                    </span>
                                    <span className="dropdownItem" onClick={handleLogout}>
                                        Logout
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/register">
                                <button className="navButton" style={{ backgroundColor: '#3BA1E3' }}>Register</button>
                            </Link>
                            <Link to="/login">
                                <button className="navButton" style={{ backgroundColor: '#F0F2F5' }}>Login</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
