import { ACTIONS } from './bookmarkActionsType.js';

export default function bookMarkReducer(state, action) {
    switch (action.type) {
        case ACTIONS.FETCH_ALL_BOOKMARKS:
            return { ...state, allBookMarks: action.payload };

        case ACTIONS.FETCH_SINGLE_BOOKMARK_REQUEST:
            return { ...state, isLoadingSingleBookMark: true };

        case ACTIONS.FETCH_SINGLE_BOOKMARK_SUCCESS:
            return { ...state, isLoadingSingleBookMark: false, singleBookMark: action.payload };

        case ACTIONS.FETCH_SINGLE_BOOKMARK_ERROR:
            return { ...state, isLoadingSingleBookMark: false };

        case ACTIONS.ADD_BOOKMARK:
            return { ...state, allBookMarks: [...state.allBookMarks, action.payload] };

        case ACTIONS.DELETE_BOOKMARK:
            return { ...state, allBookMarks: state.allBookMarks.filter(bookmark => bookmark.id !== action.payload) };

        default:
            return state;
    }
}
