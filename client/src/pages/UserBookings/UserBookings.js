import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SidePanel from '../../components/sidePanel/SidePanel';
import BookingCard from '../../components/BookingCard/BookingCard';
import Footer from '../../components/footer/footer';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import './userBookings.css';

const UserBookings = () => {
    const { user } = useAuth();
    const [hotelData, setHotelData] = useState([]);
    const [hotelLoading, setHotelLoading] = useState(true);
    const [hotelError, setHotelError] = useState(null);
    const [visibleBookings, setVisibleBookings] = useState([]);

    const { data, loading, error } = useFetch(user ? `/users/booking/${user._id}` : null);

    useEffect(() => {
        if (data && user) {
            const fetchHotelData = async () => {
                try {
                    const hotelPromises = data.map(async (booking) => {
                        const response = await fetch(`/hotels/find/${booking.hotel}`);
                        if (!response.ok) throw new Error("Failed to fetch hotel data");
                        return await response.json();
                    });
                    const hotels = await Promise.all(hotelPromises);
                    setHotelData(hotels);
                    setVisibleBookings(data);
                } catch (error) {
                    setHotelError(error.message);
                } finally {
                    setHotelLoading(false);
                }
            };
            fetchHotelData();
        } else {
            setHotelData([]);
            setVisibleBookings([]);
            setHotelLoading(false);
        }
    }, [data, user]);

    if (!user) return <div>Please log in to view your bookings.</div>;
    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div>Error: {error}</div>;
    if (hotelLoading) return <div>Loading hotel data...</div>;
    if (hotelError) return <div>Error: {hotelError}</div>;

    const handleCancel = (bookingID) => {
        setVisibleBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingID));
    };

    return (
        <div className='contentWrapper'>
            <Navbar />
            <SidePanel />
            {visibleBookings.length === 0 && <div className='bookingMessage'>No bookings found!</div>}
            {visibleBookings && hotelData && visibleBookings.length === hotelData.length && visibleBookings.map((item, index) => (
                <BookingCard
                    key={`${item._id}-${index}`}
                    BookingID={item._id}
                    HotelName={hotelData[index].name}
                    RoomNumbers={item.roomNumbers.join(", ")}
                    CheckIn={item.dates[0]}
                    CheckOut={item.dates[item.dates.length - 1]}
                    onCancel={() => handleCancel(item._id)}
                />
            ))}
            <Footer className='bookingFooter' />
        </div>
    );
};

export default UserBookings;
