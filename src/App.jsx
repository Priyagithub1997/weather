import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faBoltLightning, faCloudSun, faCloudSunRain, faCoffee, faGlassWaterDroplet, faMagnifyingGlass, faRainbow, faSun, faWater, faWind } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';



function App() {
  const [value,setvalue]=useState("Chennai");
  const [temp,settemp]=useState("");
  const [city,setcity]=useState("");
  const [country,setcountry]=useState("");
  const [humidity,sethumidity]=useState("");
  const [windspeed,setwindspeed]=useState("");
  
  const handlechange = async () => {
    try {

      const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=8834430ebe2dd6a355b9531bb2765275&units=metric`);
      const data = await api.json();
      console.log(data.main);
      settemp(data.main.temp);
      setcity(data.name);
      setcountry(data.sys.country);
      sethumidity(data.main.humidity);
      setwindspeed(data.wind.speed);
      
    }
    catch (err) {
      console.log("Error", err);
    }

  }
useEffect(()=>{
  handlechange();

},[]);

const handlekeydown=(e)=>
{
if(e.key==="Enter")
{
  handlechange();
}
}

 

  return (

    <>
      <div className="container">
        <div className="searchbox">
          <input className="searchinput" value={value} onChange={(e)=>setvalue(e.target.value)} onKeyDown={handlekeydown} placeholder="Search City"></input>
          <FontAwesomeIcon onClick={handlechange} className="searchicon"icon={faMagnifyingGlass} />
       
        </div>
       <div className='imagediv'>
        {temp>30 ? <FontAwesomeIcon className='sun' icon={faSun}/>
        :temp>28 ? <FontAwesomeIcon className='sun' icon={faCloudSun} />
        :temp>26 ? <FontAwesomeIcon className='blue ' icon={faCloudSunRain} />
        :temp>18 ? <FontAwesomeIcon className='blue ' icon={faWater} />
        :temp>10 ? <FontAwesomeIcon className='blue ' icon={faGlassWaterDroplet} />
        :temp>8  ? <FontAwesomeIcon className='blue 'icon={faBoltLightning}/>:
        <FontAwesomeIcon icon={faSnowflake} />}
  


      
       
       </div>

        <div className="citydiv">
          <h4>{temp} C</h4>
          <h2>{city}</h2>
          <h4>{country}</h4>
        </div>
        <div className="humiditydiv">
          <div>
            <h3>Humidity <span>{humidity} %</span> </h3>
            <FontAwesomeIcon className='humidity' icon={faWater} />
          </div>
          <div>
            <h3>Wind Speed <span>{windspeed} km/hr</span></h3>
            <FontAwesomeIcon className='windspeed' icon={faWind} />
              

          </div>

        </div>

      </div>
  
     </>
  )
}

export default App
