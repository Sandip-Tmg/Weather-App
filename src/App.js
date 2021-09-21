import React,{useEffect, useState} from 'react';
import './App.css';

const App = ()=>{

  const API_KEY="ee5cda74467a8a1e41d673a93a7bdbc9";    
  const [temperatures,setTemperatures]= useState([]);
  const[input,setInput] = useState("");
  const[city,setCity]= useState("");
  
  useEffect(()=>{
      getWeatherRequest();
  },[city]);

  const getWeatherRequest= async ()=>{
      const response= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      const data= await response.json();
      setTemperatures(data);
      console.log(data);     
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
        
        {city===""?(
            <p></p>
        ):temperatures.weather===undefined?(
          <p className="errorMsg" style={{"color":"red","fontSize":"1.5rem"}}>Please enter the correct city name</p>
          ):(
            <div>
            <div className="weather-status d-flex pb-3">
              <img src={"http://openweathermap.org/img/wn/"+ `${temperatures.weather[0].icon}`+".png"} alt=""/>
              <h1> {temperatures.weather[0].description}</h1>
            </div>
            <div className="city">
              <h1><i class="fas fa-location-arrow"></i> {userCity}</h1>
            </div>
            <div className="temperature-section">
              <h1>{Math.round(temperatures.main.temp)}°C</h1>   
              <div className="min-max-temp">
                <h2>Min: {Math.round(temperatures.main.temp_min)}°C</h2>
                <h2>Max: {Math.round(temperatures.main.temp_max)}°C</h2>
              </div>       
            </div>
          </div>
        )}
        
            
      </div>
  
    );
  
  
    
 
}

export default App;
