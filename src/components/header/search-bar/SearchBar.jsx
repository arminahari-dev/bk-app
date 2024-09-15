import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHeaderFiltersContext } from "../../../providers/header-filters-context/HeaderFiltersContext.jsx";
import useFetchAllLocation from "../../../hooks/fetch-all-location/useFetchAllLocation.jsx";

export default function SearchBar() {
    const [openDestInputModal, setOpenDestInputModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [visibleItemsCount, setVisibleItemsCount] = useState(3);
    const [filteredCities, setFilteredCities] = useState([]);

    const { setDestination } = useHeaderFiltersContext();
    const { allLocation } = useFetchAllLocation();

    const modalRef = useRef(null);

    const cityNames = useMemo(() => allLocation.map(location => location.city), [allLocation]);

    const displayedItems = useMemo(() => {
        return filteredCities.length ? filteredCities.slice(0, visibleItemsCount) : cityNames.slice(0, visibleItemsCount);
    }, [filteredCities, cityNames, visibleItemsCount]);

    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    }, [modalRef]);

    const closeModal = () => {
        setOpenDestInputModal(false);
        setVisibleItemsCount(3);
    };

    const showMoreItems = () => {
        const count = Math.min(visibleItemsCount + 3, filteredCities.length || cityNames.length);
        setVisibleItemsCount(count);
    };

    const onFocusHandler = () => {
        setInputValue("");
        setOpenDestInputModal(true);
        setFilteredCities([])
    };

    const onUserSearchHandler = (e) => {
        const query = e.target.value.toLowerCase();
        setInputValue(e.target.value);

        if (query.length === 0) {
            setFilteredCities([]);
            setDestination("");
            return;
        }

        const matchedCities = cityNames.filter(city => city.toLowerCase().includes(query));
        setFilteredCities(matchedCities.length ? matchedCities : ["No results found"]);
    };

    const onLocationClick = (location) => {
        if (location === "No results found") return;

        setDestination(location);
        setInputValue(location);
        closeModal();
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    return (
        <div>
            <label className={`input flex items-center font-normal focus-within:border_style hover:border_style gap-2 bg-[#2e313e] cursor-pointer`}>
                <input
                    value={inputValue}
                    onFocus={onFocusHandler}
                    onChange={onUserSearchHandler}
                    type="text"
                    className="grow cursor-pointer tracking-[1px]"
                    placeholder="Where are you going ?"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            <AnimatePresence>
                {openDestInputModal && (
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.15 }}
                        className="w-max h-fit border border-white border-opacity-50 p-2 bg-[#2e313e] rounded absolute top-[8rem] z-[999]"
                    >
                        <span className="font-bold">Going to?</span>
                        <div className={`flex ${filteredCities.length === 1 ? "items-center" : "items-start"} flex-col pt-[13px] gap-2 max-h-[12rem] ${visibleItemsCount > 3  && "overflow-y-scroll"}`}>
                            {displayedItems.map((location, index) => (
                                <React.Fragment key={index}>
                                    <hr className="h-[0.5px] bg-gray-700 w-[100%]" />
                                    <div
                                        onClick={() => onLocationClick(location)}
                                        className={`font-light ${location === "No results found" ? "" : "cursor-pointer"}`}
                                    >
                                        {location}
                                    </div>
                                </React.Fragment>
                            ))}
                            {displayedItems.length < (filteredCities.length || cityNames.length) && (
                                <div className="flex justify-center pt-2 w-[9.75rem]">
                                    <a onClick={showMoreItems} className="cursor-pointer">
                                        Show More
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
