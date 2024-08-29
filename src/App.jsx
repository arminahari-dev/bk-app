import Header from "./components/header/Header.jsx";
import {Toaster} from "react-hot-toast";
import AllLocationPage from "./pages/all-location/AllLocationPage.jsx";
import {Routes,Route} from "react-router-dom";
import SearchResLayout from "./layouts/search-res/SearchResLayout.jsx";
import SearchLocationsListPage from "./pages/search-loactions-list/SearchLocationsListPage.jsx";
import HeaderFiltersContext from "./providers/header-filters-context/HeaderFiltersContext.jsx";
import SingleLocationPage from "./pages/single-location/SingleLocationPage.jsx";
import LocationContext from "./providers/location-context/LocationContext.jsx";
import BookMarkLayout from "./layouts/book-mark-layout/BookMarkLayout.jsx";
import AllBookMarkPage from "./pages/all-bookmark/AllBookMarkPage.jsx";
import BookMarkContext from "./providers/bookmark-context/BookMarkContext.jsx";
import SingleBookMark from "./pages/single-book-mark/SingleBookMark.jsx";
import AddNewBookMark from "./pages/add-new-bookmark/AddNewBookMark.jsx";

export default function App() {
        return (
            <>
                <Toaster />
                    <HeaderFiltersContext>
                        <Header/>
                    </HeaderFiltersContext>
                <LocationContext>
                    <BookMarkContext>
                        <Routes>
                            <Route path="/"  element={<AllLocationPage/>}/>
                            <Route path={"/search-res"} element={<SearchResLayout/>}>
                                <Route index element={<SearchLocationsListPage/>}/>
                                <Route path={":id"} element={<SingleLocationPage/>}/>
                            </Route>
                            <Route path={"/bookmark"} element={<BookMarkLayout/>}>
                                <Route index element={<AllBookMarkPage/>}/>
                                <Route path={":id"} element={<SingleBookMark/>}/>
                                <Route path={"add"} element={<AddNewBookMark/>}/>
                            </Route>
                        </Routes>
                    </BookMarkContext>
                </LocationContext>
            </>
        )
}