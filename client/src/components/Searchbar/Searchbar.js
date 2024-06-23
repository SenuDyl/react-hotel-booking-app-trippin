import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays, faPerson, faSearch } from "@fortawesome/free-solid-svg-icons"; // Changed faMagnifyingGlass to faSearch
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./searchbar.css";
import useFetch from "../../hooks/useFetch";
import List from "../../pages/list/List";
import { SearchContext } from "../context/SearchContext";

const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });


    const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}`);

    const navigate = useNavigate();

    const handleOption = (name, operation) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [name]: operation === "i" ? prevOptions[name] + 1 : prevOptions[name] - 1,
        }));
    };

    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { city: destination, dates: dates, options } })

        reFetch();

        navigate("/hotels", { state: { destination, dates, options, data, loading } });
    };
    console.log(data)

    return (
        <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                    type="text"
                    placeholder="Where are you going?"
                    className="headerSearchInput"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                >
                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                        dates[0].endDate,
                        "MM/dd/yyyy"
                    )}`}
                </span>
                {openDate && (
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="dateCategory"
                        minDate={new Date()}
                    />
                )}
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="headerSearchText"
                >
                    {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                    <div className="optionsCategory">
                        <div className="optionItem">
                            <span className="optionText">Adult</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.adult <= 1}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("adult", "d")}
                                >
                                    -
                                </button>
                                <span className="optionCounterNumber">{options.adult}</span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("adult", "i")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Children</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.children <= 0}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("children", "d")}
                                >
                                    -
                                </button>
                                <span className="optionCounterNumber">{options.children}</span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("children", "i")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.room <= 1}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("room", "d")}
                                >
                                    -
                                </button>
                                <span className="optionCounterNumber">{options.room}</span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("room", "i")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#3BA1E3' }} className="headerIcon" />
                </button>
            </div>
        </div>
    );
};

export default Header;
