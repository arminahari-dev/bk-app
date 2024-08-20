import {useLocationContext} from "../../providers/location-context/LocationContext.jsx";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import LocationCard from "../../components/location-card/LocationCard.jsx";
import Skeleton from "../../components/skeleton/Skeleton.jsx";

export default function SingleLocationPage() {

    let [searchParams] = useSearchParams();

    const {getSingleLocation,singleLocation,isLoadingSingleLocation} = useLocationContext()

    const id =searchParams.get("id");

    useEffect(()=>{
        getSingleLocation(id)
    },[id])

    return(
        <>
            {isLoadingSingleLocation ? <Skeleton count={singleLocation.length}/>:singleLocation.map(location => (<LocationCard key={location.id} location={location}/>))}
        </>
    )
}
