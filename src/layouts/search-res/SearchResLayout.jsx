import {Outlet} from "react-router-dom";
import Map from "../../components/map/Map.jsx";
import {useLocationContext} from "../../providers/location-context/LocationContext.jsx";
import NotFoundPage from "../../pages/404 not-found/NotFoundPage.jsx";

export default function SearchResLayout() {


    const { locationFilter,emptyRes } = useLocationContext();

    return (
        <>
            {
                emptyRes ? <NotFoundPage/> :
                    <div className={"flex items-center justify-center h-[80vh] flex-col"}>
                        <div
                            className={"search-res-layout grid grid-cols-[30%,70%] items-end justify-items-center"}>
                                <div className={`dynamic-sidebar`}>
                                    <Outlet/>
                                </div>
                                <div className={"map-container w-[95%] z-[2]"}>
                                    <Map markerPosition={locationFilter}/>
                                </div>
                            </div>
                    </div>
            }
        </>
    )
}
