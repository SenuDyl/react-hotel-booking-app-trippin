
import React from 'react'
import './card.css';
import cardImage from '../../assets/Pool.png';

const Navbar = () => {
    return (
        <div className="card">
            <img src={cardImage} alt="CardImage" className="cardImage" />
            <div className="cardContent">
                <span className="cardTitle">Find your perfect place to stay</span>
                <p className="cardBody">Discover the best deals, compare prices, and read what other travelers have to say about hotels before you book</p>

            </div>

        </div>
    )
}

export default Navbar;

