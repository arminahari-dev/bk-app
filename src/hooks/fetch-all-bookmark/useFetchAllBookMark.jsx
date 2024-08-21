import { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";

const useFetchAllBookMark = () => {

    const [allBookMarks, setAllBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const base_Url="http://localhost:5000";
    const path= "bookmarks"

    const location = useLocation()

    useEffect(() => {
        const fetchAllBookMarks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${base_Url}/${path}`);
                setAllBookmarks(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllBookMarks();
    }, [base_Url,path,location.pathname==="/bookmark"]);

    return { allBookMarks, loading, error };
};

export default useFetchAllBookMark;
