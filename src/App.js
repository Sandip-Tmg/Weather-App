import React,{useEffect, useState} from 'react';
import './App.css';
import API_KEY from './config';

const App = ()=>{

  const [temperatures,setTemperatures]= useState([]);
  const[input,setInput] = useState("");
  const[city,setCity]= useState("");
  
  useEffect(()=>{
      getWeatherRequest();
  },[city]);

  const getWeatherRequest= async ()=>{
      const response= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      const data= await response.json();
      setTemperatures(data.main);
      console.log(temperatures);     
  }

  const handleChange=(e)=>{
    setInput(e.target.value);
  }

  const getWeather=(e)=>{
    e.preventDefault();
    setCity(input);
    setInput('');
  }

  //convert first char of letter enter by user to uppercase
  const userCity=city.charAt(0).toUpperCase()+ city.slice(1);

  // const icon="http://openweathermap.org/img/wn/"+ `${temperatures.weather[0].icon}`+".png";
  
    return(

      <div className="App">  
        <div className="header pb-5">
          <h1>Weather App</h1>
        </div>
        <form className="weather-form">
           <input value={input} id="search-bar" placeholder="Enter the city name..." className="form-control" onChange={handleChange}/>
           <button onClick={getWeather} className="btn btn-dark" id="search-btn">Search</button>
        </form>

        {/* if the city is empty return empty p tag */}
        {city===""?(
            <p></p>
        ):temperatures===undefined?(
          <p className="errorMsg" style={{"color":"red","fontSize":"1.5rem"}}>Please enter the correct city name</p>
          ):(
            <div>
            <div className="city">
              <h1><i class="fas fa-location-arrow"></i> {userCity}</h1>
            </div>
            <div className="temperature-section">
              <h1>{Math.round(temperatures.temp)}°C</h1>   
              <div className="min-max-temp">
                <h2>Min: {Math.round(temperatures.temp_min)}°C</h2>
                <h2>Max: {Math.round(temperatures.temp_max)}°C</h2>
              </div>       
            </div>
          </div>
        )}
        
            
      </div>
  
    );
  
  
    
 
}

export default App;
