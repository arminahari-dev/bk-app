import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAllBookMark = () => {

    const [allBookMarks, setAllBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const base_Url="http://localhost:5000";
    const path= "bookmarks"

    useEffect(() => {
        const fetchBookMark = async () => {
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
        fetchBookMark();
    }, [base_Url,path]);

    return { allBookMarks, loading, error };
};

export default useFetchAllBookMark;
