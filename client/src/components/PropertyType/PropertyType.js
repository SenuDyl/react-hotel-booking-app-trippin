import React, { useRef } from 'react';
import './PropertyType.css';
import useFetch from '../../hooks/useFetch';

const PropertyType = () => {
    const { data, loading, error } = useFetch("/hotels/countByType")
    const images = {
        hotel: "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=",
        apartment: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        resort: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
        villa: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
        cabin: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
    };
    console.log("data", data)

    const listRef = useRef(null);

    const scrollLeft = () => {
        listRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        listRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="propertyDetails">
            {loading ? "Loading" : <><div className="propertyHeader">
                <span className="propertyTitle">Browse by property type</span>
            </div>
                <div className="propertyListContainer">
                    <button className="arrow left" onClick={scrollLeft}>&#9664;</button>
                    <div className="propertyList" ref={listRef}>
                        {data && data.map((item, i) => (

                            <div className="propertyListItem">
                                <img src={images[item.type]} className='propertyListImg' />
                                <div className="propertyListTitles">
                                    <h2>{item.type}</h2>
                                    <h3>{item.count} {item.type}s</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="arrow right" onClick={scrollRight}>&#9654;</button>
                </div></>}
        </div>
    );
}

export default PropertyType;
