import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Card from '../../components/Card/Card';
import PropertyList from '../../components/PropertList/PropertyList';
import PropertyType from '../../components/PropertyType/PropertyType';
import Featured from '../../components/featured/featured';
import Footer from '../../components/footer/footer';
import Searchbar from '../../components/Searchbar/Searchbar';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <Card />
            <div className='searchbar-container'>
                <Searchbar />
            </div>
            <PropertyList />
            <PropertyType />
            <Featured />
            <Footer />
        </div>
    );
};

export default Home;
