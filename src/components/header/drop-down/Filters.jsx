import FiltersOption from "./filters/FiltersOption.jsx";
import {useHeaderFiltersContext} from "../../../providers/header-filters-context/HeaderFiltersContext.jsx";

export default function Filters() {
        const { bedroomNumber,setBedroomNumber }  = useHeaderFiltersContext();
        const { bathroomNumber,setBathroomNumber }  = useHeaderFiltersContext();
        const { bedNumber,setBedNumber }  = useHeaderFiltersContext();
return(
    <div className={"drop_down"}>
            <FiltersOption type={"bedroom"} typeNum={bedroomNumber} setTypeNum={setBedroomNumber}/>
            <FiltersOption type={"bathroom"} typeNum={bathroomNumber} setTypeNum={setBathroomNumber}/>
            <FiltersOption type={"bed"} typeNum={bedNumber} setTypeNum={setBedNumber}/>
    </div>
)
}