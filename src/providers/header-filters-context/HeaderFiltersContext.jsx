import {createContext, useContext, useState} from 'react';
import useGetToday from "../../hooks/get-today/useGetToday.jsx";
import useFetchLocationWithFilters from "../../hooks/fetch-location-with-filters/useFetchLocationWithFilters.jsx";

const headerFiltersContext = createContext("");

export default function HeaderFiltersContext({ children }) {
    const today=useGetToday()

    const [destination,setDestination]=useState("")
    const [bedroomNumber,setBedroomNumber]=useState(1)
    const [bathroomNumber,setBathroomNumber]=useState(1)
    const [bedNumber,setBedNumber]=useState(1)
    const [checkInDate,SetCheckInDate]=useState(today)
    const [checkOutDate,SetCheckOutDate]=useState(today)

    return (
        <headerFiltersContext.Provider value={{
            destination,
            setDestination,
            bedroomNumber,
            setBedroomNumber,
            bathroomNumber,
            setBathroomNumber,
            bedNumber,
            setBedNumber,
            checkInDate,
            SetCheckInDate,
            checkOutDate,
            SetCheckOutDate,
        }}>{children}
        </headerFiltersContext.Provider>
    );
}

export function useHeaderFiltersContext(){
    let FiltersContext;
    FiltersContext = useContext(headerFiltersContext);
    return FiltersContext;
}


