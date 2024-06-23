import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
import SearchItem from '../../components/SearchItem/searchItem';
import Searchbar from '../../components/Searchbar/Searchbar'; // Ensure correct path to Searchbar component
import './list.css';
import useFetch from '../../hooks/useFetch';

const List = () => {

    const location = useLocation();
    const { destination, dates, options, data, loading } = location.state;
    console.log(destination)
    console.log(data);

    return (
        <div className='listItems'>
            <Navbar />
            <div className='searchBar'>
                <Searchbar />
            </div>
            <div className='search'>
                {
                    loading ? "loading" : <>
                        {data.map(item => (
                            <SearchItem item={item} key={item._id} />

                        ))}
                    </>
                }
            </div>
            <Footer />
        </div>
    );
};


export default List;
