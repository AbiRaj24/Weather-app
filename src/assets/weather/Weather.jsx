 import SunnyCloud from '../../assets/sunnycloud.png';
 import CloudySun from '../../assets/cloudysun.png'
 import Humidity from '../../assets/humidity.png';
 import Wind from '../../assets/wind.png';
 import RainCloud from '../../assets/rainny.png';
 import SnowCloud from '../../assets/snow.png';
import { useEffect, useState } from "react";
import ThunderCloud from "../../assets/thunder.png";

const image = {
  width: "150px",
  height: "150px",
};
const HumidityIcon={
  width:'30px',
  height:'30px'
}
const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind}) => {
  return (
    <>
      <div className="image">
        <img style={image} src={icon} alt="image" />
      </div>
      <div className="temp">{temp}C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div >
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div >
          <span className='log'>Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={Humidity} style={HumidityIcon} alt="humidity" 
          className="icon"/>
       <div className="data">
        <div className="humidity-percent">{humidity}%</div>
        <div className='text'>Humidity</div>
       </div>
        </div>
        <div className="element">
          <img src={Wind} style={HumidityIcon} alt="wind" 
          className="icon"/>
       <div className="data">
        <div className="humidity-percent">{wind} km/h</div>
        <div className='text'>wind</div>
       </div>
        </div>
      </div>
    </>
  );
};


export default function Weather()
{

  let apiKey="e0029e329bcca29a1fd35bb943e0045d";
const[text,setText]=useState("chennai");

  const [icon,setIcon]=useState(SnowCloud);
  const[temp,setTemp]=useState(0);
  const [city,setCity]=useState("chennai")
  const [country,setCountry]=useState("IN")
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [Humidity,setHumidity]=useState(0);
  const [Wind,setWind]=useState(0);

  const[loading,setLoading]=useState(false);
  const[cityNotFound,setCityNotFound]=useState(false);

const weatherIconMap={
  "01d":SunnyCloud,
  "01n":SunnyCloud,
  "02d":CloudySun,
  "02n":CloudySun,
  "03d":ThunderCloud,
  "03n":ThunderCloud,
  "04d":ThunderCloud,
  "04d":ThunderCloud,
  "09d":RainCloud,
  "09n":RainCloud,
  "10d":RainCloud,
  "10n":RainCloud,
  "13d":SnowCloud,
  "13n":SnowCloud

};

  const search=async()=>{
   setLoading(true);

    let url=`https://api.openweathermap.org/data/2.5/weather?q=
    ${text}&appid=${apiKey}&units=Metric`;

    try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod === "404"){
        console.error("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      } 
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp))
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon)
      setCityNotFound(false);
    }
    catch(error){console.error("an error occured:",error.message);
  }
finally{
    setLoading(false);
  }
}
const HandleCity=(e)=>{setText(e.target.value)}
const handleKeyDown=(e)=>{if(e.key === "Enter"){
  search();
}}
useEffect(function(){
  search();
},[])
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="city-input"
          onChange={HandleCity} value={text}
          onKeyDown={handleKeyDown} placeholder="Search City" />
          <div className="button">
            <button onClick={()=>search()}>SEARCH</button>
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country}
         lat={lat} log={log} humidity={Humidity} wind={Wind}/>
      </div>
     
    </>
  );
}