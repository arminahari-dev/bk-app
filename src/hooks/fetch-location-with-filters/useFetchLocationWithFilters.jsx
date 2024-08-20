import { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";

const useFetchLocationWithFilters = (base_Url,path,filters) => {
    const [locationFilter, setLocationFilter] = useState([]);
    const [emptyRes, setEmptyRes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const location=useLocation()

    useEffect(() => {
        const fetchLocationWithFilters = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${base_Url}/${path}?${filters}`);
                setLocationFilter(response.data);
                response.data.length === 0 ? setEmptyRes(true) : setEmptyRes(false);
                location.pathname==="/search-res/single-location" && setEmptyRes(false)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocationWithFilters();
    }, [base_Url,path,filters]);

    return { locationFilter, loading, error,emptyRes};
};

export default useFetchLocationWithFilters;
