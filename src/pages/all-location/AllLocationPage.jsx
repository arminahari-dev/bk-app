import useFetchAllLocation from "../../hooks/fetch-all-location/useFetchAllLocation.jsx";
import toast from 'react-hot-toast';
import LocationCard from "../../components/location-card/LocationCard.jsx";
import Skeleton from "../../components/skeleton/Skeleton.jsx";

export default function AllLocationPage() {
    const {allLocation, loading, error} = useFetchAllLocation()

    if (error) toast.error(error.message);

    return (
        <div className={`all-location bg-base-300 h-[80%]`}>
            <div className={"flex justify-center text-lg"}>
                <h1>All Location</h1>
            </div>
            <div
                className={`grid desktop-large:grid-cols-4 desktop:grid-cols-3 laptop:grid-cols-2 tablet:grid-cols-1 justify-items-center gap-y-8`}>
                {
                    loading ? <Skeleton count={allLocation.length}/> :
                        allLocation.map((location) => (<LocationCard location={location} key={location.id}/>))
                }
            </div>
        </div>
    )
}

