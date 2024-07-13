import { getWeatherDataForCity, getWeatherDataForLocation} from "../api";
import { createContext,useContext,useState } from "react";

const WeatherContext = createContext(null);

export const useWeather =() => {
    return useContext(WeatherContext);
};

export const WeatherProvider = (props) => {
    const [data, setData] = useState(null);
    const[searchCity, setSearchCity] = useState(null);

    const fetchData = async() => {
        const response = await getWeatherDataForCity(searchCity)
        setData(response);
    };

    const fetchCurrentUserLocationData = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeatherDataForCity(
                position.coords.latitude,
                position.coords.longitude
            ).then((data) => setData(data));
        });
    }

    return(
        <WeatherContext.Provider value={{ searchCity, data, setSearchCity, fetchData, fetchCurrentUserLocationData}}>
            {props.children}
        </WeatherContext.Provider>
    );
};

