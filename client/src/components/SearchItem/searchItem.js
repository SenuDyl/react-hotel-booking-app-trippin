import './searchItem.css';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
    const rating = item.rating;
    const maxRating = 5;

    const getStarRating = (rating, maxRating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {'★'.repeat(fullStars)}
                {halfStar && '☆'}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

    return (
        <div className='searchItem'>
            <div className='hotelImg'>
                <img src={item.photos[0]} alt='Hotel' />
            </div>
            <div className='siDetails'>
                <span className='hotelTitle'>{item.name}</span>
                <span className='hotelLocation'>{item.address}</span>
                <span className='hotelDetails'>{item.distance}</span>
                <span className='hotelDesc'>{item.title}</span>

                <span className='hotelOther'>Free Cancellation</span>
                <span className='hotelOther'>No additional charges will be added</span>
            </div>
            <div className='siSubDetails'>
                <span className='hotelPrice'>${item.cheapestPrice} per night</span>
                {item.rating && <div className='hotelRatings'>
                    <div className='stars'>{getStarRating(rating, maxRating)}</div>

                </div>}
                <Link to={`/hotels/${item._id}`}>

                    <button className='siCheckButton'>Book Now</button>
                </Link>
            </div>
        </div>
    );
};

export default SearchItem;
