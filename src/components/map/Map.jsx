import {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import useGeoLocation from "../../hooks/get-user-geo-location/useGeoLocation.jsx";

const Map = ({markerPosition}) => {

    let [searchParams] = useSearchParams();
    const [mapCenter, setMapCenter] = useState([51.505,  -0.09]);
    const lat = parseFloat(searchParams.get("lat"))
    const lng = parseFloat(searchParams.get("lon"))

    const {getPosition,position,isLoading} = useGeoLocation()

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);
    }, [lat, lng]);

    useEffect(() => {
        if (position?.lat && position?.lng)
            setMapCenter([position.lat, position.lng]);
    }, [position]);

    return (
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} style={{height: '62vh', width:"100%", borderRadius: "5px"}}>
            <button className={"absolute top-[10px] right-[10px] z-[1000] bg-purple-500 p-3"} onClick={getPosition}>{isLoading ? "loading" : "use your location"}</button>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <DetectClick />
            <ChangeCenter position={mapCenter}/>
            { lat & lng &&
                <Marker position={[lat, lng]} />
            }
            {markerPosition &&
                markerPosition.map(location => (
                    <Marker position={[location.latitude, location.longitude]} key={location.id}>
                        <Popup>
                            <div>
                                <h2 className="card-title text-black text-sm">{location.host_name}</h2>
                            </div>
                        </Popup>
                    </Marker>
                ))
            }
            { position?.lat && position?.lng &&
                <Marker position={[position?.lat , position?.lng]}>
                    <Popup>
                        <div>
                            <h2 className="card-title text-black text-sm">your location</h2>
                        </div>
                    </Popup>
                </Marker>
            }
        </MapContainer>
    );
};

export default Map;

function ChangeCenter({position}) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position);
    }, [position]);

    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvent(
        {
        click: (e) =>
            navigate(`/bookmark/add?lat=${e.latlng.lat}&lon=${e.latlng.lng}`),
    });
    return null;
}