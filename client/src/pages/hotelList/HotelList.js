import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
import SearchItem from '../../components/SearchItem/searchItem';

const HotelsPage = () => {
    const location = useLocation();
    const selectedHotel = location.state?.selectedHotel;
    console.log(selectedHotel);

    return (
        <div className='listItems'>
            <Navbar />

            <div className='search'>
                {selectedHotel &&
                    selectedHotel.map(item => (
                        <SearchItem item={item} key={item._id} />
                    ))
                }
            </div>
            <Footer />
        </div>
    );
};

export default HotelsPage;
