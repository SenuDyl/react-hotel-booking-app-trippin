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
                <img src='https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=' alt='Hotel' />
            </div>
            <div className='siDetails'>
                <span className='hotelTitle'>{item.name}</span>
                <span className='hotelLocation'>{item.city}</span>
                <span className='hotelDetails'>All the items are free</span>
                <span className='hotelDesc'>{item.desc}</span>
                <span className='hotelOther'>No additional charges will be added</span>
            </div>
            <div className='siSubDetails'>
                <span className='hotelPrice'>${item.cheapestPrice} per night</span>
                {item.rating && <div className='hotelRatings'>
                    {getStarRating(rating, maxRating)}
                    <span className='ratingNumber'>({rating})</span>
                </div>}
                <Link to={`/hotels/${item._id}`}>

                    <button className='siCheckButton'>Book Now</button>
                </Link>
            </div>
        </div>
    );
};

export default SearchItem;
