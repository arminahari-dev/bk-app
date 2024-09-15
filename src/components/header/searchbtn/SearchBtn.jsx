import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {createSearchParams, useNavigate} from "react-router-dom";
import {useHeaderFiltersContext} from "../../../providers/header-filters-context/HeaderFiltersContext.jsx";

export default function SearchBtn() {
    const navigate = useNavigate();
    const { destination,bedroomNumber,bathroomNumber,bedNumber,checkInDate,checkOutDate }  = useHeaderFiltersContext();

    const filters = {
        destination,
        bedroomNumber,
        bathroomNumber,
        bedNumber,
        checkInDate:checkInDate,
        checkOutDate:checkOutDate
    };

    //const searchParams = new URLSearchParams(filters);
    const searchParams = createSearchParams(filters);

    return (
        <>
            <button onClick={()=>{
                navigate({
                    pathname: "search-res",
                    search: searchParams.toString()
                });
            }} className="flex flex-row items-center gap-[10px] bg-[#2e313e] text-white border_style px-3 py-[10px] rounded-[8px]">
                <span>search</span>
                <MagnifyingGlassIcon className="size-5 transform transition-transform duration-300 ease-in-out group-hover:scale-110"/>
            </button>
        </>
    )
}
