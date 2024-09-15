import Filters from "../drop-down/Filters.jsx";
import { FunnelIcon } from '@heroicons/react/24/solid'

export default function DropDownButton() {
    return (
        <>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-[#2e313e] hover:bg-[#2e313e] cursor-pointer font-normal px-4 pb-8 pt-3 text-[#9ca3af] tracking-[1px] text-[1rem] hover:border_style focus-within:border_style flex justify-center items-center w-[7rem]">
                    Filters
                    <FunnelIcon className="size-5"/>
                </div>
                <div tabIndex={0} className="dropdown-content !opacity-90 mt-4 menu bg-[#2e313e] rounded z-[1] w-fit h-fit p-2 shadow border border-white border-opacity-50">
                    <Filters/>
                </div>
            </div>
        </>
    )
}