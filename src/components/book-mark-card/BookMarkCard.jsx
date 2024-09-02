import ReactCountryFlag from "react-country-flag";
import {useLocation, useNavigate} from "react-router-dom";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useBookMarkContext} from "../../providers/bookmark-context/BookMarkContext.jsx";

export default function BookMarkCard({bmark,isLast}) {

    const navigate=useNavigate()

    const location=useLocation()

    const {cityName,country,countryCode,id,latitude,longitude,host_location} = bmark

    const {deleteBookMark} = useBookMarkContext();

    function navigatorHandler(){
        if (location.pathname==="/bookmark"){
            navigate(`/bookmark/singlebookmark?id=${id}&lat=${latitude}&lon=${longitude}&host_location=${host_location}`);
        }
    }

    //console.log(host_location)
    return (
        <>
            <div onClick={navigatorHandler}
                 className={`book-mark-card p-4 border rounded mb-4 w-[10rem] h-[5rem] bg-[#2e313e] ${location.pathname === "/bookmark" && "cursor-pointer"} 
        ${isLast && "border-green-500"}`}>
                <div className="mt-2">
                    <h2 className="text-2xl font-bold truncate">{cityName}</h2>
                    <p className="text-sm text-gray-600 truncate">{country}</p>
                    <ReactCountryFlag countryCode={countryCode} svg/>
                </div>
            </div>
            <FontAwesomeIcon onClick={() => deleteBookMark(id)} icon={faTrash}/>
        </>
    )
}