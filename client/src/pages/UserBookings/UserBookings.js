import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SidePanel from '../../components/sidePanel/SidePanel';
import BookingCard from '../../components/BookingCard/BookingCard';
import Footer from '../../components/footer/footer';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';

const UserBookings = () => {
    const { user } = useAuth();
    const { data, loading, error } = useFetch(`/users/booking/${user._id}`);
    const [hotelData, setHotelData] = useState([]);
    const [hotelLoading, setHotelLoading] = useState(true);
    const [hotelError, setHotelError] = useState(null);
    const [visibleBookings, setVisibleBookings] = useState([]);

    useEffect(() => {
        if (data) {
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
                    console.log(data)
                    const roomPromises = data.map(async (rooms) => {
                        const res = await fetch(`/rooms/${rooms.hotel}`);
                    })

                } catch (error) {
                    setHotelError(error.message);
                } finally {
                    setHotelLoading(false);
                }
            };

            fetchHotelData();
        }
    }, [data]);



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (hotelLoading) return <div>Loading hotel data...</div>;
    if (hotelError) return <div>Error: {hotelError}</div>;

    const handleCancel = (bookingID) => {
        setVisibleBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingID));
    }

    return (
        <div>
            <Navbar />
            <SidePanel />

            {data && hotelData && data.length === hotelData.length && data.map((item, index) => (
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

            <Footer />
        </div>
    );
};

export default UserBookings;
