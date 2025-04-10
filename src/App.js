import './App.css';
import Search from './components/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);

    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);
  console.log(forecast);


  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}

      <hr style={{
        margin: "2rem auto",
        width: "80%",
        border: "0",
        height: "2px",
        background: "linear-gradient(to right, transparent, #2c3e50, transparent)"
      }} />
      <div className="about-section">
        <h2>About This Project</h2>
        <p>
          Created by Sharukh Ahmed, this weather application provides real-time
          weather information using OpenWeather API and GeoDB Cities API.
          Built with React and modern web technologies.
        </p>
      </div>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} Sharukh-Ahmed. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
