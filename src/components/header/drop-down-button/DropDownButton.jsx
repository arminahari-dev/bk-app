import Filters from "../drop-down/Filters.jsx";
import { FunnelIcon } from '@heroicons/react/24/solid'

export default function DropDownButton() {
    return (
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 border_style bg-[#2e313e]">
                Filters
                <FunnelIcon className="size-5"/>
            </div>
            <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[999] w-[22rem] p-4 shadow border_style">
              <Filters/>
            </div>
        </div>
    )
}