import React,{useState,useEffect} from 'react'
import axios from "axios";
const URL_Icon = "https://openweathermap.org/img/wn/";
export default function Weather({weather,location}) {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    getIcon();
  }, [weather.main]);
  
  const getIcon = async () => {
    const result = URL_Icon + weather.weather[0].icon + '@2x.png';
    setIcon(result);
  }
  return (
    <div>
      <p>{location[0].name}, {location[0].country}</p>
        {
          weather.main ? 
          (<div>
            <img src={icon}></img>
            <p>{weather.main.temp}<sup>o</sup>C</p>
            <p>Feels like {weather.main.feels_like}<sup>o</sup>C. {weather.weather[0].main}. {weather.weather[0].description}</p>
            <ul>
                <li><p>Wind: {weather.wind.speed}m/s E</p></li>
                <li><p>Pressure: {weather.main.pressure}hPa</p></li>
                <li><p>Visibility: {weather.visibility}%</p></li>
                <li><p>Humidity: {weather.main.humidity}km</p></li>
            </ul>
          </div> 
          ) : (null)
        }
    </div>
  )
}
