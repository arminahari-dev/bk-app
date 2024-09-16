import { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";

const useFetchLocationWithFilters = (base_Url,path,filters) => {
    const [locationFilter, setLocationFilter] = useState([]);
    const [emptyRes, setEmptyRes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const location=useLocation()

    function newAbortSignal(timeoutMs) {
        const abortController = new AbortController();
        setTimeout(() => abortController.abort(), timeoutMs || 0);

        return abortController.signal;
    }

    useEffect(() => {
        const fetchLocationWithFilters = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `${base_Url}/${path}?${filters}`,
                    {
                        signal: newAbortSignal(5000)
                    }
                );
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
