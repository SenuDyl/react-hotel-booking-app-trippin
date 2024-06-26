// SidePanel.js
import React from 'react';
import './SidePanel.css';

const SidePanel = () => {
    return (
        <div className="side-panel">
            <div className="list-group">
                <a href="/" className="list-group-item list-group-item-action active" aria-current="true">
                    Home
                </a>
                <a href="/profile" className="list-group-item list-group-item-action" >My Profile</a>
                <a href="/profile/userbookings" className="list-group-item list-group-item-action">Bookings</a>
                <a href="/profile/changepassword" className="list-group-item list-group-item-action">Change Password</a>
            </div>
        </div>
    );
}

export default SidePanel;
