import React, { useState } from 'react';
import './propertyList.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=Yala,Kandy,Negombo,Colombo,Galle,Nuwara Eliya,Ella,Jaffna");
    const [selectedHotel, setSelectedHotel] = useState(null);
    const navigate = useNavigate();

    const handleClick = async (hotelName) => {
        try {
            console.log(hotelName);
            const response = await fetch(`/hotels/findByName?city=${hotelName}`);
            if (!response.ok) throw new Error('Failed to fetch hotel data');
            const hotel = await response.json();
            console.log('hotels', hotel);
            setSelectedHotel(hotel);
            navigate('/hotelList', { state: { selectedHotel: hotel } });
        } catch (error) {
            console.error(error.message);
        }
    };

    if (loading) return <div>Loading, please wait...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="pDetails">
            <div className="pHeader">
                <span className="pTitle">Top destinations</span>
            </div>
            <div className="pList">
                {data && data.length > 0 && (
                    <>
                        <div className="pListItem" onClick={() => handleClick('Ella')}>
                            <img src="https://media.istockphoto.com/id/803613114/photo/nine-arches-demodara-bridge.jpg?s=612x612&w=0&k=20&c=YaUyiIY5UstbUgQ4q77DU_xhaEJF2MqAYfO59SclkWA=" alt="property" className="pListImg" />
                            <div className="pListTitles">
                                <h2>Ella</h2>
                                <h3>{data[6]} properties</h3>
                            </div>
                        </div>
                        <div className="pListItem" onClick={() => handleClick('Kandy')}>
                            <img src="https://media.istockphoto.com/id/1285881901/photo/temple-of-the-sacred-tooth-relic-at-kandy-sri-lanka.jpg?s=612x612&w=0&k=20&c=gqnoXgatwo1Ar_oCYnGnmE3Ts7sn9DvYKPK0n6Mhca8=" alt="property" className="pListImg" />
                            <div className="pListTitles">
                                <h2>Kandy</h2>
                                <h3>{data[1]} properties</h3>
                            </div>
                        </div>
                        <div className="pListItem" onClick={() => handleClick('Galle')}>
                            <img src="https://holidays.santamonicafly.com/images/Blog/galle.jpg" alt="property" className="pListImg" />
                            <div className="pListTitles">
                                <h2>Galle</h2>
                                <h3>{data[4]} properties</h3>
                            </div>
                        </div>
                        <div className="pListItem" onClick={() => handleClick('Nuwara Eliya')}>
                            <img src="https://travelrebels.com/wp-content/uploads/2024/04/tips-voor-nuwara-eliya.jpg" alt="property" className="pListImg" />
                            <div className="pListTitles">
                                <h2>Nuwara Eliya</h2>
                                <h3>{data[5]} properties</h3>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PropertyList;
