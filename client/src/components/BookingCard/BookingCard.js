
import './bookingCard.css';

const BookingCard = () => {
    return (
        <div>
            <div className="booking-card" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Booking ID</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Hotel Name</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Room Numbers</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Amount</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Reserved Dates</h6>

                </div>
                <button className='cancelButton'>Cancel</button>
            </div>
        </div>
    );
}

export default BookingCard;
