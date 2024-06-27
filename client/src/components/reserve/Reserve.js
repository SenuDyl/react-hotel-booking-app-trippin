import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
    const { user, dispatch } = useAuth();
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!dates || dates.length === 0) {
            // Handle case where dates are not available
            console.error("Dates are not available");
        }
    }, [dates]);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());
        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const alldates = dates.length > 0 ? getDatesInRange(dates[0].startDate, dates[0].endDate) : [];

    const isAvailable = (roomNumber) => {
        if (!roomNumber.unavailableDays) {
            return true;
        }
        const isFound = roomNumber.unavailableDays.some((date) =>
            alldates.includes(new Date(date).getTime())
        );
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };

    const handleClick = async () => {
        if (selectedRooms.length === 0) {
            console.error("No rooms selected");
            return;
        }
        if (!user) {
            console.error("User not authenticated");
            return;
        }
        try {
            await Promise.all(
                selectedRooms.map((roomId) =>
                    axios.put(`/rooms/availability/${roomId}`, {
                        dates: alldates,
                    })
                )
            );
            console.log("Unavailability updated");
            setOpen(false);
            const response = await axios.post(`/bookings/${user._id}`, {
                user: user._id,
                hotel: hotelId,
                rooms: selectedRooms,
                dates: alldates,
            });
            console.log('booking response', response.data);


        } catch (err) {
            console.error("Error during reservation:", err);
        }
    };

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:</span>
                {loading ? (
                    "Loading..."
                ) : error ? (
                    <span>Error loading data</span>
                ) : (
                    data.map((item) => (
                        <div className="rItem" key={item._id}>
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.desc}</div>
                                <div className="rMax">
                                    Max people: <b>{item.maxPeople}</b>
                                </div>
                                <div className="rPrice">{item.price}</div>
                            </div>
                            <div className="rSelectRooms">
                                {item.roomNumbers.map((roomNumber) => (
                                    <div className="room" key={roomNumber._id}>
                                        <label>{roomNumber.number}</label>
                                        <input
                                            type="checkbox"
                                            value={roomNumber._id}
                                            onChange={handleSelect}
                                            disabled={!isAvailable(roomNumber)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>
            </div>
        </div>
    );
};

export default Reserve;
