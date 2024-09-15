import FiltersOption from "./filters/FiltersOption.jsx";
import {useHeaderFiltersContext} from "../../../providers/header-filters-context/HeaderFiltersContext.jsx";
import React from "react";

export default function Filters() {
        const { bedroomNumber,setBedroomNumber }  = useHeaderFiltersContext();
        const { bathroomNumber,setBathroomNumber }  = useHeaderFiltersContext();
        const { bedNumber,setBedNumber }  = useHeaderFiltersContext();

        function clearFilterHandler() {
            setBedroomNumber(1), setBathroomNumber(1) , setBedNumber(1)
        }

return(
    <>
        <div className={"flex justify-between"}>
            <span className="font-bold">filters</span>
            <span onClick={clearFilterHandler} className="font-bold cursor-pointer">clear all</span>
        </div>
        <div className={"drop_down"}>
            <FiltersOption type={"bedroom"} typeNum={bedroomNumber} setTypeNum={setBedroomNumber}/>
            <div className={"flex items-center justify-center"}>
                <hr className="h-[0.5px] bg-gray-800 w-[100%] max-w-[1200px]"/>
            </div>
            <FiltersOption type={"bathroom"} typeNum={bathroomNumber} setTypeNum={setBathroomNumber}/>
            <div className={"flex items-center justify-center"}>
                <hr className="h-[0.5px] bg-gray-800 w-[100%] max-w-[1200px]"/>
            </div>
            <FiltersOption type={"bed"} typeNum={bedNumber} setTypeNum={setBedNumber}/>
        </div>
    </>
)
}