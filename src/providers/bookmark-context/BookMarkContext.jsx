import {createContext, useContext, useEffect, useReducer} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useFetchAllBookMark from '../../hooks/fetch-all-bookmark/useFetchAllBookMark.jsx';
import bookMarkReducer from "./bookmarkReducer.js"
import { ACTIONS } from './bookmarkActionsType.js';

const bookMarkContext = createContext("");

export default function BookMarkContext({ children }) {

    const base_Url = "http://localhost:5000";
    const path = "bookmarks";

    const { allBookMarks, loading, error } = useFetchAllBookMark();

    const initialState = {
        singleBookMark: [],
        allBookMarks: [],
        isLoadingSingleBookMark: false
    };

    useEffect(() => {
        if (allBookMarks.length > 0) {
            dispatch({ type: ACTIONS.FETCH_ALL_BOOKMARKS, payload: allBookMarks });
        }
    }, [allBookMarks]);

    const [state, dispatch] = useReducer(bookMarkReducer, initialState);

    async function getSingleBookMark(id) {
        dispatch({ type: ACTIONS.FETCH_SINGLE_BOOKMARK_REQUEST });
        try {
            const { data } = await axios.get(`${base_Url}/${path}?id=${id}`);
            dispatch({ type: ACTIONS.FETCH_SINGLE_BOOKMARK_SUCCESS, payload: data });
        } catch (error) {
            toast.error(error.message);
            dispatch({ type: ACTIONS.FETCH_SINGLE_BOOKMARK_ERROR });
        }
    }

    async function addNewBookMark(newBookMark) {
        try {
            const { data } = await axios.post(`${base_Url}/${path}`, newBookMark);
            dispatch({ type: ACTIONS.ADD_BOOKMARK, payload: data });
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function deleteBookMark(id) {
        try {
            await axios.delete(`${base_Url}/${path}/${id}`);
            dispatch({ type: ACTIONS.DELETE_BOOKMARK, payload: id });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <bookMarkContext.Provider value={{
            ...state,
            loading,
            error,
            getSingleBookMark,
            addNewBookMark,
            deleteBookMark
        }}>
            {children}
        </bookMarkContext.Provider>
    );
}

export function useBookMarkContext() {
    return useContext(bookMarkContext);
}
