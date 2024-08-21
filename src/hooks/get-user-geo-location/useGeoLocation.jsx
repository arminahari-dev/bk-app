import { useState } from "react";
import toast from "react-hot-toast";

export default function useGeoLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [geoPosition, setGeoPosition] = useState({});
    const [error, setError] = useState(null);

    function getGepPosition() {
        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setGeoPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
                toast.error("Could not get geolocation");
            }
        );
    }
    return {getGepPosition,geoPosition,isLoading,error,};
}
