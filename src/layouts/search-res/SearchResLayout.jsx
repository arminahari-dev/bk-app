import {Outlet, useLocation} from "react-router-dom";
import Map from "../../components/map/Map.jsx";
import {useLocationContext} from "../../providers/location-context/LocationContext.jsx";
import NotFoundPage from "../../pages/404 not-found/NotFoundPage.jsx";

export default function SearchResLayout() {

    const location = useLocation();

    const { locationFilter,emptyRes } = useLocationContext();

    return (
        <>
            {
                emptyRes ? <NotFoundPage/> : <div className={"search-res-layout bg-base-300 grid grid-cols-[35%,65%] items-center justify-items-center h-[80vh] pt-[2rem]"}>
                    <div className={`dynamic-sidebar ${location.pathname === '/search-res' && "overflow-y-scroll max-h-[27rem]"}`}>
                        <Outlet/>
                    </div>
                    <div className={"map-container w-[95%] flex items-center justify-center z-[2]"}>
                        <Map markerPosition = {locationFilter}/>
                    </div>
                </div>
            }
        </>
    )
}
