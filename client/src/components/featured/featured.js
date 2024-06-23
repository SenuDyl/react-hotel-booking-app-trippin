import React, { useRef } from 'react';
import './featured.css';
import useFetch from '../../hooks/useFetch';

const Featured = () => {
    const { data, loading, error } = useFetch("/hotels?featured=true");
    const listRef = useRef(null);

    const scrollLeft = () => {
        listRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        listRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const getRatingText = (rating) => {
        if (rating >= 4) return 'Excellent';
        if (rating >= 3) return 'Superb';
        if (rating >= 2) return 'Satisfactory';
        if (rating >= 1) return 'Fair';
        return 'Poor';
    };

    return (
        <div className="featuredDetails">
            <div className="featuredHeader">
                <span className="featuredTitle">Popular Among Guests</span>
            </div>
            <div className="featuredListContainer">
                <button className="arrow left" onClick={scrollLeft}>&#9664;</button>
                <div className="featuredList" ref={listRef}>
                    {loading ? "Loading" : <>
                        {data.map((item) => (
                            <div className="featuredListItem" key={item._id}>
                                <img src={item.photos[0]} alt={item.name} className="featuredListImg" />
                                <div className="featuredListTitles">
                                    <h2>{item.name}</h2>
                                    <h3>{item.city}</h3>
                                    <h3>Starting from <span className='featuredPrice'>${item.cheapestPrice}</span></h3>
                                    {item.rating && (
                                        <div>
                                            <span className='featuredRatings'>{item.rating}</span>
                                            <span className='featuredComment'>{getRatingText(parseFloat(item.rating.toString()))}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>}
                </div>
                <button className="arrow right" onClick={scrollRight}>&#9654;</button>
            </div>
        </div>
    );
};

export default Featured;
