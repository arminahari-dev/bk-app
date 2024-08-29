import { useHeaderFiltersContext } from "../../../providers/header-filters-context/HeaderFiltersContext.jsx";
import React, {useEffect, useRef, useState} from "react";
import useFetchAllLocation from "../../../hooks/fetch-all-location/useFetchAllLocation.jsx";
import { motion } from "framer-motion"

export default function SearchBar() {
    const [openDestInputModal, setOpenDestInputModal] = useState(false);
    const [showDef, setShowDef] = useState(false);
    const [userSearchRes, setUserSearchRes] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const { setDestination } = useHeaderFiltersContext();
    const { allLocation } = useFetchAllLocation();

    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenDestInputModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    function onFocusHandler() {
        setInputValue("")
        setOpenDestInputModal(true);
        setShowDef(true);
    }

    function onUserSearchHandler(e) {
        const query = e.target.value.toLowerCase();
        setInputValue(e.target.value);

        const cites = allLocation.map((location) => location.city);

        if (query.length === 0) {
            setShowDef(true);
            setUserSearchRes([])
            setDestination("")
            return
        }

        const filteredCites = cites.filter((city) =>
            city.toLowerCase().includes(query)
        );

        setUserSearchRes(
            filteredCites.length > 0 ? filteredCites : ["No results found"]
        );

        setShowDef(false);
    }

    function onLocationClick(location) {
        if (location==="No results found"){
            return
        }
        else {
            setDestination(location);
            setInputValue(location);
            setOpenDestInputModal(false);
        }
    }

    return (
        <div>
            <label className="input input-bordered flex items-center gap-2 border_style bg-[#2e313e]">
                <input
                    value={inputValue}
                    onFocus={onFocusHandler}
                    onChange={(e) => onUserSearchHandler(e)}
                    type="text"
                    className="grow"
                    placeholder="Where are you going?"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>
            {openDestInputModal && (
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className={`w-fit h-fit border border-white border-opacity-50 p-2 bg-[#2e313e] opacity-90 rounded absolute top-[8rem] z-[999]`}
                >
                    <span className="font-bold">Going to ?</span>
                    <div
                        className={`flex ${userSearchRes[0] === "No results found" ? "items-center" : "items-start"} flex-col pt-[13px] gap-2`}
                    >
                        {showDef
                            ? allLocation.map((location, index) => (
                                <React.Fragment key={index}>
                                    <hr className="h-[1px] bg-white w-[9.5rem] opacity-30" />
                                    <div
                                        onClick={() => onLocationClick(location.city)}
                                        className="defualtLocation font-light cursor-pointer"
                                    >
                                        {location.city}
                                    </div>
                                </React.Fragment>
                            ))
                            : userSearchRes.map((location, index) => (
                                <React.Fragment key={index}>
                                    <hr className="h-[1px] bg-white w-[9.5rem] opacity-30" />
                                    <div
                                        onClick={() => onLocationClick(location)}
                                        className={`search-res font-light ${location === "No results found" ? "" : "cursor-pointer"}`}
                                    >
                                        {location}
                                    </div>
                                </React.Fragment>
                            ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
