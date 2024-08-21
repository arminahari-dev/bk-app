import {Outlet, useLocation} from "react-router-dom";
import Map from "../../components/map/Map.jsx";
import {useBookMarkContext} from "../../providers/bookmark-context/BookMarkContext.jsx";

export default function BookMarkLayout() {

    const location = useLocation();

    const {allBookMarks} = useBookMarkContext()

    return (
        <>
            {
                <div className={"book-mark-layout bg-base-300 grid grid-cols-[70%,30%] items-center justify-items-center h-[80vh] pt-[2rem]"}>
                    <div className={`dynamic-sidebar ${location.pathname === '/search-res' && "overflow-y-scroll max-h-[27rem] grid grid-cols-2 gap-x-8"}`}>
                        <Outlet/>
                    </div>
                    <div className={"map-container w-[100%] flex items-center justify-center z-[2]"}>
                        <Map markerPosition={allBookMarks}/>
                    </div>
                </div>
            }
        </>
    )
}
