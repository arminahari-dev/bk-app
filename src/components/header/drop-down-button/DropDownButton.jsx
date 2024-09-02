import Filters from "../drop-down/Filters.jsx";
import { FunnelIcon } from '@heroicons/react/24/solid'
import {AnimatePresence, motion} from "framer-motion";

export default function DropDownButton() {
    return (
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 border_style bg-[#2e313e]">
                Filters
                <FunnelIcon className="size-5"/>
            </div>
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 0.9, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.2}}
                >
                    <div tabIndex={0}
                         className="dropdown-content menu bg-base-100 rounded-box z-[9999] w-fit p-4 shadow border_style">
                        <Filters/>
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    )
}