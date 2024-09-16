import {CustomProvider, DateRangePicker} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {useHeaderFiltersContext} from "../../../providers/header-filters-context/HeaderFiltersContext.jsx";
import useGetToday from "../../../hooks/get-today/useGetToday.jsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export default function DRangePicker() {

    const [isInputActive, setIsInputActive]  = useState(false);
    const {checkInDate,SetCheckInDate,checkOutDate, SetCheckOutDate} = useHeaderFiltersContext();
    const today = useGetToday()

    const url = useLocation();

    function handleDateRangeSelection(dateRange) {
        let startDate = formatDate(dateRange[0]);
        let endDate = formatDate(dateRange[1]);
        SetCheckInDate(startDate);
        SetCheckOutDate(endDate);
    }

    function formatDate(dr) {
        const dateStr = dr;
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    function resetDate() {
        SetCheckInDate(today);
        SetCheckOutDate(today);
    }

    useEffect(() => {
        if (checkInDate !== today || checkOutDate !== today) {
            setIsInputActive(true);
        } else {
            setIsInputActive(false);
        }
        if (isInputActive){
            setIsInputActive(false);
        }
    }, [url.pathname]);


    return (
        <>
            {isInputActive ? <div className="indicator">
                <span className="indicator-item badge badge-secondary"></span>
                <CustomProvider theme="dark">
                    <DateRangePicker onClean={resetDate} onOk={(e) => {
                        handleDateRangeSelection(e)
                    }} size="lg" placeholder={`${checkInDate} - ${checkOutDate}`}/>
                </CustomProvider>
            </div>: <CustomProvider theme="dark">
                <DateRangePicker onClean={resetDate} onOk={(e) => {
                    handleDateRangeSelection(e)
                }} size="lg" placeholder={"checkin date - checkout date"}/>
            </CustomProvider>}
        </>
    )
}