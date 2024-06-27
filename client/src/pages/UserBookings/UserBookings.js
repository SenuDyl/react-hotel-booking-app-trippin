import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import SidePanel from '../../components/sidePanel/SidePanel';
import BookingCard from '../../components/BookingCard/BookingCard';


const Profile = () => {
    return (
        <div>
            <Navbar />
            <SidePanel />
            <BookingCard />
        </div>
    )
}

export default Profile
