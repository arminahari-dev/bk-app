import {UserCircleIcon} from '@heroicons/react/24/solid'
import {useLocation, useNavigate} from "react-router-dom";
import Rating from "../Rating/Rating.jsx";
import Carousel from "../carousel/Carousel.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function LocationCard({location,isLast}) {

    const navigate=useNavigate()
    const url = useLocation();

    if (!location) {
        return <FontAwesomeIcon icon={faSpinner} />
    }

    const {
        name,
        xl_picture_url,
        summary,
        host_picture_url,
        host_name,
        price,
        review_scores_rating
        ,id,
        latitude,
        longitude,
    } = location;

    function navigatorHandler(){
       if (url.pathname==="/search-res"){
           navigate(`single-location?id=${id}&lat=${latitude}&lon=${longitude}`);
       }
    }

    return (
        <div className={`location-card p-4 border rounded mb-4 w-[27rem] h-[28rem] bg-[#2e313e] ]
          ${isLast && "border-green-500"}
          ${url.pathname==="/"&&"shadow-lg shadow-indigo-500/50"}`}>
            {
                xl_picture_url.length === 0 ? <img src="https://placehold.co/480x290?text=no-img-to-show" alt={name}/> : <Carousel xl_picture_url={xl_picture_url}/>
            }
            <div onClick={navigatorHandler} className={`mt-3 ${url.pathname === "/search-res" && "cursor-pointer"}`}>
                <h2 className="text-gray-400 text-2xl font-bold truncate">{name}</h2>
                <p className="text-sm text-gray-400 truncate mt-3">{summary}</p>
                {url.pathname === "/search-res" ? <div className="flex items-center justify-between mt-3">
                        <div className={"flex items-center"}>
                            {
                                host_picture_url ?
                                    <img src={host_picture_url} alt={host_name} className="w-10 h-10 rounded-full"/> :
                                    <UserCircleIcon className={"w-11 h-11"}/>
                            }
                            <span className="text-gray-400 ml-2 text-lg">{host_name}</span>
                        </div>
                        <div>
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">BookMark <FontAwesomeIcon icon={faBookmark} /></button>
                        </div>
                    </div> :
                    <div className="flex items-center mt-3">
                        {
                            host_picture_url ?
                                <img src={host_picture_url} alt={host_name} className="w-10 h-10 rounded-full"/> :
                                <UserCircleIcon className={"w-11 h-11"}/>
                        }
                        <span className="text-gray-400 ml-2 text-lg">{host_name}</span>
                    </div>
                }
                <div className="flex justify-between items-center mt-3">
                    <span className="text-lg">
                        <span className="text-gray-400 font-semibold">${price}</span>
                        &nbsp;
                        <span className={"text-gray-400"}>(per night)</span>
                    </span>
                    <span className="flex items-center gap-[3px] text-sm text-gray-400">Rating  : <Rating rating={review_scores_rating}/></span>
                </div>
            </div>
        </div>
    )
}