import { useState } from "react";
import LocationCard from "../../components/location-card/LocationCard.jsx";
import toast from "react-hot-toast";
import Skeleton from "../../components/skeleton/Skeleton.jsx";
import { useLocationContext } from "../../providers/location-context/LocationContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default function SearchLocationsListPage() {
    const { locationFilter, error, loading, singleLocation } = useLocationContext();

    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(locationFilter[currentIndex])

    if (error) toast.error(error.message);

    const handleNext = () => {
        if (currentIndex < locationFilter.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <>
            {loading ? (
                <Skeleton count={1} />
            ) : (
                <LocationCard
                    key={locationFilter[currentIndex]?.id}
                    location={locationFilter[currentIndex]}
                    isLast={locationFilter[currentIndex]?.id === singleLocation[0]?.id}
                />
            )}

            <div className="join grid grid-cols-2 mt-4">
                <button
                    className="join-item btn btn-outline"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                    className="join-item btn btn-outline"
                    onClick={handleNext}
                    disabled={currentIndex === locationFilter.length - 1}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </>
    );
}