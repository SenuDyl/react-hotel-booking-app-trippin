import React, { useRef } from 'react';
import './PropertyType.css';
import useFetch from '../../hooks/useFetch';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PropertyType = () => {
    const { data, loading, error } = useFetch("/hotels/countByType")
    const images = {
        hotel: "https://assets.anantara.com/image/upload/q_auto,f_auto,c_limit,w_1920/media/minor/anantara/images/anantara-peace-haven-tangalle-resort/the-resort/anantara_peace_haven_tangalle_pool_intro_944x510.jpg",
        guesthouse: "https://www.tourhero.com/en/magazine/wp-content/uploads/2020/11/madulkelle_room_03.jpg",
        resort: "https://d1bv4heaa2n05k.cloudfront.net/user-images/1508847676152/frangapani-GARY-04000_main_1508847744534.jpeg",
        villa: "https://www.villainsrilanka.co.uk/wp-content/uploads/2016/10/Villa9-Galle-MAIN.resized.jpg",
        bunglow: "https://images.squarespace-cdn.com/content/v1/5c94ab21a09a7e443410d831/1588074224112-V47KXNRAN7DO7SWO4MGZ/thotalagala+bungalow+sri+lanka"
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
                    <ArrowBackIosIcon className="arrow left" onClick={scrollLeft} />

                    <div className="propertyList" ref={listRef}>
                        {data && data.map((item, i) => (

                            <div className="propertyListItem">
                                <img src={images[item.type]} className='propertyListImg' />
                                <div className="propertyListTitles">
                                    <h2>{item.type === 'guesthouse' ? 'Guest House' : item.type}</h2>
                                    <h3>{item.count} {item.type === 'guesthouse' ? 'Guest House' : item.type}s</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ArrowForwardIosIcon className="arrow right" onClick={scrollRight} />

                </div></>}
        </div>
    );
}

export default PropertyType;
