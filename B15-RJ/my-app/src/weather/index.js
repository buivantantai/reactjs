import React,{useState} from 'react';
import Weather from './Components/weather';
import axios from "axios";
const URL_Weather = "https://api.openweathermap.org/data/2.5/weather?";
const URL_Key = "&appid=71985cb5a2686bb2548499d3013221e4";
const URL_Matric = "&units=metric";
const URL_Location1 = "http://api.openweathermap.org/geo/1.0/direct?q=";
const URL_Location2 = "&limit=0&appid=898a1725e98c1e18914ae86c0a7c7ba0";




export default function Index() {
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [location, setLocation] = useState("");
    const [locationName, setLocationName] = useState("");
    const [weather, setWeather] = useState("");
    const [country, setCountry] = useState("");
    const [icon, setIcon] = useState();

    const getCountry = async () => {
        const result = await axios.get(`${URL_Location1}${locationName}${URL_Location2}`);
        setLocation(result.data);
        getWeather(result.data[0].lat,result.data[0].lon);
    }
    const getWeather = async (a,b) => {
        const result = await axios.get(`${URL_Weather}lat=${a}&lon=${b}${URL_Key}${URL_Matric}`);
        setWeather(result.data);
    }

  return (
    <div>
        <div className="input-group" style={{justifyContent:"center", alignItems:"center"}}>
            <input  type="text" className="form-control" placeholder="Search city" aria-label="Recipient's username" aria-describedby="button-addon2"
            onChange={(text) => {
                setLocationName(text.target.value);
              }}
              value={locationName}></input>
            <button style={{height:"50px",width:"70px" }}  className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {
                getCountry();
            }}>search</button>
        </div>
        {location ? (<Weather weather={weather} location={location}/>): (null)}
        
    </div>
  )
}
