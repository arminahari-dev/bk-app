import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAllLocation = () => {

    const [allLocation, setAllLocation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const base_Url=" http://localhost:5000";
    const path= "hotels"

    useEffect(() => {
        const fetchLoc = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${base_Url}/${path}`);
                setAllLocation(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLoc();
    }, [base_Url,path]);

    return { allLocation, loading, error };
};

export default useFetchAllLocation;
