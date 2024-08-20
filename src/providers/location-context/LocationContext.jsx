import {createContext, useContext, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import useFetchLocationWithFilters from "../../hooks/fetch-location-with-filters/useFetchLocationWithFilters.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const locationContext = createContext("");

export default function LocationContext({ children }) {

    let [searchParams] = useSearchParams();
    const [singleLocation, setSingleLocation] = useState([]);
    const [isLoadingSingleLocation, setIsLoadingSingleLocation] = useState(false);

    const base_Url=" http://localhost:5000";
    const path= "hotels"

    const destination =searchParams.get("destination");
    const bedroomNumber =searchParams.get("bedroomNumber");
    const bathroomNumber =searchParams.get("bathroomNumber");
    const bedNumber =searchParams.get("bedNumber");
    const checkInDate =searchParams.get("checkInDate");
    const checkOutDate =searchParams.get("checkOutDate");

    const filters= `city=${destination}&bedrooms=${bedroomNumber}&bathrooms=${bathroomNumber}&beds=${bedNumber}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`

    const {locationFilter,error,loading, emptyRes} = useFetchLocationWithFilters(base_Url,path,filters)

    async function getSingleLocation(id) {
        setIsLoadingSingleLocation(true);
        try {
            const { data } = await axios.get(`${base_Url}/${path}/${id}`);
            setSingleLocation([data]);
            setIsLoadingSingleLocation(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoadingSingleLocation(false);
        }
    }

    return (
        <locationContext.Provider value={{locationFilter,error,loading,emptyRes,getSingleLocation,singleLocation,isLoadingSingleLocation}}>
            {children}
        </locationContext.Provider>
    );
}

export function useLocationContext(){

    let LocationSearchContext;
    LocationSearchContext = useContext(locationContext);
    return LocationSearchContext;

}


