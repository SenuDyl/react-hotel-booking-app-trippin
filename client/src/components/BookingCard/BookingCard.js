import './bookingCard.css';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useState } from 'react';

const BookingCard = ({ BookingID, HotelName, RoomNumbers, CheckIn, CheckOut, onCancel }) => {
    const { user } = useAuth();

    const handleClick = () => {
        axios.put(`/users/booking/${user._id}/${BookingID}`, { status: 'cancelled' })

            .then((res) => {
                console.log(res);
                console.log("cancelled")
                onCancel();
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });

    }

    return (
        <div>
            <div className="booking-card">
                <div className="card-body">
                    <h5 className="card-title">
                        Booking ID : <span className='card-title-content'>{BookingID}</span>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Hotel Name : <span className='card-content'>{HotelName}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Room Numbers : <span className='card-content'>{RoomNumbers}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Amount : <span className='card-content'>100$</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Check in: <span className='card-content'>{CheckIn.slice(0, 10)}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Check out: <span className='card-content'>{CheckOut.slice(0, 10)}</span>
                    </h6>
                </div>
                <button className="cancelButton" onClick={handleClick}>Cancel</button>
            </div>
        </div>
    );
};

export default BookingCard;
