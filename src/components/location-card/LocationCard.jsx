import {UserCircleIcon} from '@heroicons/react/24/solid'
import {useLocation, useNavigate} from "react-router-dom";

export default function LocationCard({location,isLast}) {

    const navigate=useNavigate()
    const url = useLocation();

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
        <div onClick={navigatorHandler} className={`location-card p-4 border rounded mb-4 w-[27rem] h-[27rem] bg-[#2e313e] ]
          ${isLast && "border-green-500"}
          ${url.pathname==="/"&&"shadow-lg shadow-indigo-500/50"} 
          ${url.pathname==="/search-res"&&"cursor-pointer"}`}>
            {
                xl_picture_url ? <img src={xl_picture_url} alt={name} className="rounded w-[30rem] h-[15rem]"/> :
                    <img src="https://placehold.co/480x290?text=no-img-to-show"/>
            }
            <div className="mt-2">
                <h2 className="text-2xl font-bold truncate">{name}</h2>
                <p className="text-sm text-gray-600 truncate">{summary}</p>
                <div className="flex items-center mt-2">
                    {
                        host_picture_url ?
                            <img src={host_picture_url} alt={host_name} className="w-10 h-10 rounded-full"/> :
                            <UserCircleIcon className={"w-11 h-11"}/>
                    }
                    <span className="ml-2 text-lg">{host_name}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-semibold">${price} per night</span>
                    <span className="text-sm text-gray-600">Rating: {review_scores_rating}/100</span>
                </div>
            </div>
        </div>
    )
}