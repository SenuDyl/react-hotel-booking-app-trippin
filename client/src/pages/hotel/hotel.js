import './hotel.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/footer'
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../components/context/SearchContext';
import { AuthContext } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Reserve from '../../components/reserve/Reserve';

const Hotel = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { data, loading, error } = useFetch(`/hotels/find/${id}`)
    const { dates, options } = useContext(SearchContext)

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dates && dates.length > 0 ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate)) : 0;


    const photos = [
        {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
        },
        {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
        },
        {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
        },
        {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
        },
        {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
        },
        {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
        },
    ];

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNumber);
    };

    const handleClick = () => {
        if (user) {
            setOpenModal(true)
        } else {
            navigate("/login")
        }
    }
    const rating = data.rating;
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
        <div>
            <Navbar />
            {loading ? "loading" : <><div className='hotelContainer'>
                {open && (
                    <div className='slider'>
                        <CloseIcon
                            onClick={() => setOpen(false)}
                            className='closeIcon'
                        />
                        <ArrowBackIosIcon
                            onClick={() => handleMove("l")}
                            className='sliderArrow'
                        />
                        <div className='slideWrapper'>
                            <img src={photos[slideNumber].src} alt="" className="sliderImg" />
                        </div>
                        <ArrowForwardIosIcon
                            onClick={() => handleMove("r")}
                            className='sliderArrow'
                        />
                    </div>
                )}
            </div>
                <div className='hotelInfo'>
                    {days > 0 ? <button onClick={handleClick} className="bookNow">Book Now</button> : <button disabled className="bookNow">Book Now</button>}
                    <span className='hotelName'>{data.name}</span>
                    <div className='hotelAddress'>
                        <LocationOnIcon />
                        <span className='hotelLocation'>{data.address}</span>
                    </div>
                    <div>
                        <span className='hotelDistance'>{data.distance}</span>
                        <div className='hotelFeatures'>

                            {data.title && <span className='hotelOtherDetails'>{data.title}</span>}
                            {data.rating && <div className='hotelRatings'>
                                <div className='stars'>{getStarRating(rating, maxRating)}</div>

                            </div>}
                        </div>
                    </div>

                    <div className='hotelImages'>
                        {photos.map((photo, i) => (
                            <div className='hotelImgWrapper' key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={photo.src}
                                    alt=""
                                    className='hotelImg'
                                />
                            </div>
                        ))}
                    </div>
                    <div className='hotelDetails'>
                        <p className="hotelDesc">
                            {data.desc}
                        </p>
                    </div>
                    <div className="hotelDetailsPrice">
                        <h1>Ideal for a weekend getaway!</h1>
                        <span>
                            Enjoy a comfortable and relaxing experience with top-notch amenities and exceptional service.
                        </span>
                        {days > 0 ?
                            <h2>
                                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                            </h2> : <h3>Please select the number of nights for your stay!</h3>}
                        {days > 0 ? <button onClick={handleClick} >Book Now</button> : <button disabled>Book Now</button>}
                    </div>
                </div></>}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
            <Footer />
        </div>

    );


};

export default Hotel;
