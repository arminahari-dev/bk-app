import LocationCard from "../../components/location-card/LocationCard.jsx";
import toast from "react-hot-toast";
import Skeleton from "../../components/skeleton/Skeleton.jsx";
import {useLocationContext} from "../../providers/location-context/LocationContext.jsx";

export default function SearchLocationsListPage() {

    const {locationFilter,error,loading,singleLocation}=useLocationContext()

    if (error) toast.error(error.message)

    return(
        <>
            {loading ? <Skeleton count={locationFilter.length}/> : locationFilter.map((location) => {

                    const isLast = location.id === singleLocation[0]?.id

                    return (
                        <LocationCard
                            key={location.id}
                            location={location}
                            isLast={isLast}
                        />
                    );
                })
            }
        </>
    )
}