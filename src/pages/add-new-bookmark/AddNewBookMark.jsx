import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import {useBookMarkContext} from "../../providers/bookmark-context/BookMarkContext.jsx";
import img from "../../assets/images/management.png"

export default function AddNewBookMark() {

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "5677ca930eac4e5fbfbf898ec27f7900";
    let [searchParams] = useSearchParams();
    const lat = parseFloat(searchParams.get("lat"))
    const lng = parseFloat(searchParams.get("lon"))

    const {addNewBookMark}=useBookMarkContext()

    const navigate=useNavigate();

    const fetchLatAndLng = async () => {
        setLoading(true);
        try {

            const response = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${API_KEY}`
            );

            const result = response.data.results[0];

            setCity(result.city || "unknown");
            setCountry(result.country || "unknown");
            setCountryCode(result.country_code || "");

        } catch (err) {
            setError(err);
            setCity("unknown");
            setCountry("unknown");
            setCountryCode("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchLatAndLng();
    },[lat,lng])

    const isDisabled = loading;
    const unknownCityAndCountry = country === "unknown" && city === "unknown";

    async function addNewBookMarkHandler() {
      if (unknownCityAndCountry){
          toast.error('cant bookmark unknown city and country',
              {
                  style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                      display : "flex",
                      flexDirection:"row-reverse"
                  },
              }
          )
      }else {
          const newBookMark ={
              id:Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
              cityName:city,
              country,
              countryCode,
              latitude:lat,
              longitude:lng,
              host_location: city+","+country
          }
          await addNewBookMark(newBookMark);
          navigate("/bookmark")
      }
    }

    {error && toast.error(error.message)}

    return (
        <>
            <h1>
                bookmark new location
            </h1>
            <AddNew labeltext={"city ->"} value={city} loading={loading}/>
            <AddNew labeltext={"country ->"} value={country} loading={loading} countryCode={countryCode}/>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={()=>{navigate(-1)}}>&#x25c0;back</button>
            <button onClick={addNewBookMarkHandler} className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ${isDisabled && "btn-disabled"}`}>add</button>
        </>

    )
}

function AddNew({ labeltext, loading, value, countryCode }) {

    function Notif(){
        return(
            toast('change the country or city on map',
                {
                    icon: '💡',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        display : "flex",
                        flexDirection:"row-reverse"
                    },
                }
            )
        )
    }

    return (
        <>
            <label onMouseEnter={Notif} onClick={Notif} className="input input-bordered flex items-center gap-2 cursor-pointer">
                {labeltext}
                {loading ? (
                    <span className="loading loading-dots loading-md"/>
                ) : (
                    <>
                        <input type="text" className="grow cursor-pointer" value={value} readOnly={true}/>
                        {labeltext === "country ->" && countryCode && (
                            <ReactCountryFlag countryCode={countryCode} svg/>
                        )}
                        {labeltext === "city ->" && (
                            <img className={"w-6 h-6"} alt={"city map"} src={img}/>
                        )}
                    </>
                )}
            </label>
        </>
    );
}