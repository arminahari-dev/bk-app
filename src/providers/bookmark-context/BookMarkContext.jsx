import {createContext, useContext, useState} from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import useFetchAllBookMark from "../../hooks/fetch-all-bookmark/useFetchAllBookMark.jsx";

const bookMarkContext = createContext("");

export default function BookMarkContext({ children }) {

    const [singleBookMark, setSingleBookMark] = useState([]);
    const [isLoadingSingleBookMark, setIsLoadingSingleBookMark] = useState(false);

    const base_Url="http://localhost:5000";
    const path= "bookmarks"

    const { allBookMarks, loading, error } = useFetchAllBookMark()

    async function getSingleBookMark(id) {
        setIsLoadingSingleBookMark(true);
        try {
            const { data } = await axios.get(`${base_Url}/${path}?id=${id}`);
            console.log(data)
            setSingleBookMark(data);
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setIsLoadingSingleBookMark(false);
        }
    }

    async function addNewBookMark(newBookMark) {
        try {
            await axios.post(`${base_Url}/${path}`,newBookMark);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <bookMarkContext.Provider value={{allBookMarks,error,loading,getSingleBookMark,singleBookMark,isLoadingSingleBookMark,addNewBookMark}}>
            {children}
        </bookMarkContext.Provider>
    );
}

export function useBookMarkContext(){
    let BookMarkContext;
    BookMarkContext = useContext(bookMarkContext);
    return BookMarkContext;
}


