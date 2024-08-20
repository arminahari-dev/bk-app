import ReactCountryFlag from "react-country-flag";
import {useNavigate} from "react-router-dom";

export default function BookMarkCard({bmark,isLast}) {

    const navigate=useNavigate()

    const {cityName,country,countryCode,id,latitude,longitude} = bmark

    function navigatorHandler(){
        navigate(`bookmark?id=${id}&lat=${latitude}&lon=${longitude}`);
    }

    return (
        <div onClick={navigatorHandler} className={`book-mark-card p-4 border rounded mb-4 w-[10rem] h-[5rem] bg-[#2e313e] cursor-pointer  
        ${isLast && "border-green-500"}`}>
            <div className="mt-2">
                <h2 className="text-2xl font-bold truncate">{cityName}</h2>
                <p className="text-sm text-gray-600 truncate">{country}</p>
                <ReactCountryFlag countryCode={countryCode} svg />
            </div>
        </div>
    )
}